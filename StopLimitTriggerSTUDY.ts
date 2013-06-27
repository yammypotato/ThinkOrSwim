##############STOPLMTTRIGGER###############
# WGRIFFITH2 (C) 2013

INPUT SIDE = "LONG";
INPUT PERIODS = 3; # LAST NUMBER OF CANDLESTICKS
INPUT ATR = 3.5; # ATR FACTOR
INPUT OVER_BOUGHT = 30;
INPUT AVGVOL = 50;

# DEFINING ENTRY
DEF KPERIOD = 14;
DEF DPERIOD = 3;
DEF FASTLINE = ROUND(SIMPLEMOVINGAVG(100*((CLOSE-LOWEST(LOW,KPERIOD))/(HIGHEST(HIGH,KPERIOD)-LOWEST(LOW,KPERIOD))), LENGTH = DPERIOD));
DEF SLOWLINE = ROUND(SIMPLEMOVINGAVG(SIMPLEMOVINGAVG(100*((CLOSE-LOWEST(LOW,KPERIOD))/(HIGHEST(HIGH,KPERIOD)-LOWEST(LOW,KPERIOD))), LENGTH = DPERIOD), LENGTH = DPERIOD));

DEF MACD = MACD("FAST LENGTH" = 5, "SLOW LENGTH" = 35, "MACD LENGTH" = 5) < 0;

DEF NEW_PERIOD = PERIODS - 1;
DEF BUYSIGNAL = VOLUMEAVG(LENGTH = AVGVOL) > VOLUMEAVG(LENGTH = AVGVOL).VOLAVG AND SLOWLINE <= OVER_BOUGHT AND FASTLINE > FASTLINE[1] AND MACD IS TRUE AND CLOSE>CLOSE[1];
DEF ENTRY = BUYSIGNAL IS TRUE;

# DEFINING EXIT
DEF ROLLINGLOW = LOWEST(DATA = LOW(), LENGTH = PERIODS)[1];
DEF STOPLOSS = (LOW <= ROLLINGLOW AND SLOWLINE>FASTLINE AND ENTRY IS FALSE);
DEF TRGT_ROLLINGLOW = LOWEST(DATA = LOW(), LENGTH = PERIODS+4)[1];
DEF TARGET = HIGH > TRGT_ROLLINGLOW + ATRWILDER()*ATR;

DEF EXIT = TARGET IS TRUE OR STOPLOSS IS TRUE;

PLOT ABOVE = ENTRY;
PLOT BELOW = EXIT;

BELOW.SETDEFAULTCOLOR(CREATECOLOR(255, 0, 0));
BELOW.SETPAINTINGSTRATEGY(PAINTINGSTRATEGY.BOOLEAN_ARROW_DOWN);
ABOVE.SETDEFAULTCOLOR(CREATECOLOR(0, 255, 0));
ABOVE.SETPAINTINGSTRATEGY(PAINTINGSTRATEGY.BOOLEAN_ARROW_UP);

#########################################