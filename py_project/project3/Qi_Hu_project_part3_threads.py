#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from queue import Queue
from queue import Empty
from threading import Thread
import csv

stocks_rows = Queue()
stocks_records = Queue()


class AbstractRecord:
    def __init__(self, name):
        self.name = name


class StockStatRecord(AbstractRecord):
    def __init__(self, name, company_name, exchange_country,
                 price, exchange_rate, shares_outstanding, net_income,
                 market_value_usd, pe_ratio):

        super().__init__(name)
        self.company_name = company_name
        self.exchange_country = exchange_country
        self.price = price
        self.exchange_rate = exchange_rate
        self.shares_outstanding = shares_outstanding
        self.net_income = net_income
        self.market_value_usd = market_value_usd
        self.pe_ratio = pe_ratio

    def __str__(self):
        return '{} ({}, {}, $price={:.2f}, $Cap={:.2f}, $P/E={:.2f})'.format(
            self.__class__.__name__, self.name, self.company_name, self.price,
            self.market_value_usd, self.pe_ratio)


class Runnable:

    def __call__(self):

        while True:
            try:
                row = stocks_rows.get(timeout=1)
            except Empty:
                break

            print('{} working hard!!'.format(id(self)))

            # validate the row
            is_valid = True
            for key in ('ticker', 'exchange_country', 'company_name', 'price',
                        'exchange_rate', 'shares_outstanding', 'net_income'):
                if key not in row:
                    is_valid = False
                    break

            if not is_valid:
                continue

            for key in ('price', 'exchange_rate',
                        'shares_outstanding', 'net_income'):
                try:
                    row[key] = float(row[key])
                except ValueError:
                    is_valid = False
                    break
                else:
                    if row[key] == 0.0:
                        is_valid = False
                        break

            if not is_valid:
                continue

            market_value_usd = row['price'] * \
                row['exchange_rate'] * row['shares_outstanding']
            pe_ratio = row['price'] / row['net_income']

            record_stock = StockStatRecord(
                row['ticker'], row['company_name'], row['exchange_country'],
                row['price'], row['exchange_rate'], row['shares_outstanding'],
                row['net_income'], market_value_usd, pe_ratio)

            stocks_records.put(record_stock)


class FastStocksCSVReader:

    def __init__(self, path):
        # the path is to the file to be read
        self.path = path

    def load(self):
        # open the csv file and put each row in stocks_rows queue
        with open(self.path, 'r') as f:
            for row in csv.DictReader(f):
                stocks_rows.put(row)

        # instance of a list named threads
        threads = []

        # create 4 threads
        for _ in range(4):
            new_thread = Thread(target=Runnable())
            threads.append(new_thread)
            # start each thread
            new_thread.start()

        # invoke the join()
        for thread in threads:
            thread.join()

        record_list_s = []

        while True:
            try:
                record_s = stocks_records.get(block=False)
            except Empty:
                break
            record_list_s.append(record_s)

        return record_list_s


if __name__ == '__main__':
    # Load csv document, and print each record to console
    record_list = FastStocksCSVReader('StockValuations.csv').load()
    for record in record_list:
        print(record)
