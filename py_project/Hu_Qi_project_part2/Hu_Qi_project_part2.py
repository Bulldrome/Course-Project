#! /usr/bin/python
# -*- coding: utf-8 -*-

import sqlite3
import csv
import collections


# AbstractDAO class
class AbstractDAO:
    def __init__(self, db_name):
        self.db_name = db_name

    def insert_records(self, records):
        raise NotImplementedError

    # connect method
    def connect(self):
        conn = sqlite3.connect(self.db_name)
        return conn


class BaseballStatsDAO(AbstractDAO):
    def __init__(self, db_name):
        super(BaseballStatsDAO, self).__init__(db_name)

    def insert_records(self, records):
        # take a list of records as parameter
        conn = self.connect()
        c = conn.cursor()
        # insert the data from csv
        for eachRecord in records:
            c.execute("INSERT INTO baseball_stats VALUES(""?, ?, ?, ?"");", (eachRecord.name,
                                                                             eachRecord.salary,
                                                                             eachRecord.games_played,
                                                                             eachRecord.average))
        conn.commit()
        conn.close()

    def select_all(self):
        conn = self.connect()
        c = conn.cursor()
        baseball_database = collections.deque()
        for row in c.execute("SELECT * FROM baseball_stats"):
            baseball_database.append(row)
        # 5.5?

        conn.close()
        return baseball_database


class StockStatsDAO(AbstractDAO):
    def __init__(self, db_name):
        super(StockStatsDAO, self).__init__(db_name)

    def insert_records(self, records):
        conn = self.connect()
        c = conn.cursor()
        for eachRecord in records:
            c.execute("INSERT INTO stock_stats VALUES(""?, ?, ?, ?, ?, ?, ?, ?, ?"");", (eachRecord.company_name,
                                                                                         eachRecord.name,
                                                                                         eachRecord.exchange_country,
                                                                                         eachRecord.price,
                                                                                         eachRecord.exchange_rate,
                                                                                         eachRecord.shares_outstanding,
                                                                                         eachRecord.net_income,
                                                                                         eachRecord.market_value_usd,
                                                                                         eachRecord.pe_ratio))
        conn.commit()
        conn.close()

    def select_all(self):
        conn = self.connect()
        c = conn.cursor()
        stocks_database = collections.deque()
        for row in c.execute('SELECT * FROM stock_stats'):
            stocks_database.append(row)
        conn.commit()
        conn.close()
        return stocks_database


# ----------------Project part_1 code From this line---------------
class AbstractRecord:
    def __init__(self, name):
        self.name = name


class StockStatRecord(AbstractRecord):
    def __init__(self, name, company_name, exchange_country, price, exchange_rate, shares_outstanding, net_income, market_value_usd, pe_ratio):
        super(StockStatRecord, self).__init__(name)
        self.company_name = company_name
        self.exchange_country = exchange_country
        self.price = price
        self.exchange_rate = exchange_rate
        self.shares_outstanding = shares_outstanding
        self.net_income = net_income
        self.market_value_usd = market_value_usd
        self.pe_ratio = pe_ratio

    def __str__(self):
        return '{} ({}, {}, $price={:.2f}, $Cap={:.2f}, $P/E={:.2f})'.format(self.__class__.__name__, self.name, self.company_name, self.price, self.market_value_usd, self.pe_ratio)


class BaseballStatRecord(AbstractRecord):
    def __init__(self, name, salary, games_played, average):
        super(BaseballStatRecord, self).__init__(name)
        self.salary = salary
        self.games_played = games_played
        self.average = average

    def __str__(self):
        return "{} ({}, {}, {}, {:.3f})".format(self.__class__.__name__, self.name, self.salary, self.games_played, self.average)


class AbstractCSVReader:
    def __init__(self, path):
        self.path = path
        self.data_list = []

    def row_to_record(self, row):
        raise NotImplementedError

    def load(self):
        with open(self.path, 'r') as csv_data:
            file_reader = csv.DictReader(csv_data)
            data_list = []
            for row in file_reader:
                data_record = self.row_to_record(row)
                if data_record is not None:
                    data_list.append(data_record)
            return data_list


class BaseballCSVReader(AbstractCSVReader):
    def row_to_record(self, row):
        for key in ['PLAYER', 'SALARY', 'G', 'AVG']:
            if key not in row:
                raise BadData

        if not row['PLAYER']:
            raise BadData

        for key in ['SALARY', 'G']:
            try:
                row[key] = int(row[key])
            except ValueError:
                raise BadData
        for key in ['AVG']:
            try:
                row[key] = float(row[key])
            except ValueError:
                raise BadData
        for key in ['SALARY', 'G', 'AVG']:
            if row[key] == 0:
                raise BadData

        return BaseballStatRecord(row['PLAYER'], row['SALARY'], row['G'], row['AVG'])


class StocksCSVReader(AbstractCSVReader):
    def row_to_record(self, row):
        # validate the row
        try:
            for key in ['ticker', 'exchange_country', 'company_name', 'price', 'exchange_rate', 'shares_outstanding', 'net_income']:
                if key not in row:
                    raise BadData
            for key in ['price', 'exchange_rate', 'shares_outstanding', 'net_income']:
                try:
                    float(row[key])
                    data_float = 1
                except ValueError:
                    data_float = 0
                    pass
                if data_float == 1:
                    try:
                        row[key] = float(row[key])
                    except ValueError:
                        pass
                elif row[key] == 0:
                    raise BadData

            if type(row['net_income']) != float or type(row['price']) != float or type(row['exchange_rate']) != float or type(row['shares_outstanding']) != float:
                raise BadData
            else:
                market_value_usd = row['price'] * row['exchange_rate'] * row['shares_outstanding']
                pe_ratio = row['price'] / row['net_income']
                return StockStatRecord(row['ticker'], row['company_name'], row['exchange_country'], row['price'], row['exchange_rate'], row['shares_outstanding'], row['net_income'], market_value_usd, pe_ratio)
        except BadData:
            pass


class BadData(Exception):
        pass



if __name__ == "__main__":

    stocks_record = StocksCSVReader('StockValuations.csv').load()
    baseball_record = BaseballCSVReader('MLB2008.csv').load()
    baseball_sql_data = BaseballStatsDAO("baseball.db")
    stocks_sql_data = StockStatsDAO("stocks.db")

    baseball_sql_data.insert_records(baseball_record)
    stocks_sql_data.insert_records(stocks_record)

    data_baseball = baseball_sql_data.select_all()
    data_stocks = stocks_sql_data.select_all()

    stock_dict = {}
    baseball_dict1 = {}
    baseball_dict2 = {}

    # Compute the average salary and enter into a dictionary by batting average
    for record in data_baseball:
        if record[3] in dict.keys(baseball_dict1):
            baseball_dict1[record[3]] += record[1]
            baseball_dict2[record[3]] += 1
        else:
            baseball_dict1[record[3]] = record[1]
            baseball_dict2[record[3]] = 1
    for keys in baseball_dict1.keys():
        baseball_dict1[keys] = baseball_dict1[keys]/baseball_dict2[keys]
    for keys in baseball_dict1.keys():
        print("{}  {:,.2f}".format(keys, round(baseball_dict1[keys], 3)))

    print('\n')

    # number of tickers
    for record in data_stocks:
        if record[2] in dict.keys(stock_dict):
            stock_dict[record[2]] += 1
        else:
            stock_dict[record[2]] = 1
    for keys in stock_dict.keys():
        print('{}  {}'.format(keys, stock_dict[keys]))










