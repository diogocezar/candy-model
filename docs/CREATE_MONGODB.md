# Instructions to create MongoDB at c9.io environment

## Pre-requisites

The MongoDB is intalled on your c9.io environment.

## Using

To start MongoDB use:

```
$ mkdir database
$ echo 'mongod --bind_ip=$IP --dbpath=database --nojournal --rest "$@"' > start_database.sh
$ chmod a+x start_database.sh
```

## Explaning

```
--dbpath=data - Because it defaults to /var/db (which isn't accessible)
--nojournal - Because mongodb usually pre-allocates 2 GB journal file (which exceeds Cloud9 disk space quota)
--bind_ip=$IP - Because you can't bind to 0.0.0.0
--rest - Runs on default port 28017
```

## Using

To start your database

```
./start_database.sh
```

To stop your database just kill proccess with Crtl + C