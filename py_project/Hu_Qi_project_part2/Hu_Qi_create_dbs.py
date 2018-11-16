#! /usr/bin/python
# -*- coding: utf-8 -*-

import sqlite3

# create baseball.db
database_file1 = 'baseball.db'
table_name1 = 'baseball_stats'

player_name = 'player_name'
player_name_type = 'text'
games_played = 'games_played'
games_played_type = 'integer'
average = 'average'
average_type = 'real'
salary = 'salary'
salary_type = 'real'

with sqlite3.connect(database_file1) as conn:
    c = conn.cursor()
    c.execute('''Create table {0} (
                 {1} {2},
                 {3} {4},
                 {5} {6},
                 {7} {8}
                 );''' .format(table_name1,
                               player_name, player_name_type,
                               games_played, games_played_type,
                               average, average_type,
                               salary, salary_type)
              )
    conn.commit()


# create stocks.db
database_file2 = 'stocks.db'
table_name2 = 'stock_stats'

com_name = 'company_name'
com_name_type = 'text'
tic = 'ticker'
tic_type = 'text'
country = 'country'
country_type = 'text'
price = 'price'
price_type = 'real'
ex_rate = 'exchange_rate'
ex_rate_type = 'real'
sh_out = 'shares_outstanding'
sh_out_type = 'real'
net_in = 'net_income'
net_in_type = 'real'
market_v = 'market_value'
market_v_type = 'real'
pe_r = 'pe_ratio'
pe_r_type = 'real'

with sqlite3.connect(database_file2) as conn:
    c = conn.cursor()
    c.execute('''Create table {0} (
                 {1} {2},
                 {3} {4},
                 {5} {6},
                 {7} {8},
                 {9} {10},
                 {11} {12},
                 {13} {14},
                 {15} {16},
                 {17} {18}
                 );''' .format(table_name2,
                               com_name, com_name_type,
                               tic, tic_type,
                               country, country_type,
                               price, price_type,
                               ex_rate, ex_rate_type,
                               sh_out, sh_out_type,
                               net_in, net_in_type,
                               market_v, market_v_type,
                               pe_r, pe_r_type)
              )
    conn.commit()


