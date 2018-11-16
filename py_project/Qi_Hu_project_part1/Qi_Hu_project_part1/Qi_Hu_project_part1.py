#! /usr/bin/python
# -*- coding: utf-8 -*-

import csv


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
    Stocks_record = StocksCSVReader('StockValuations.csv').load()
    for record in Stocks_record:
        print(record)

    print('\n')

    Baseball_record = BaseballCSVReader('MLB2008.csv').load()
    for record in Baseball_record:
        print(record)
