# BackupSystem

A BackupSystem written in node wich implements the way of a partial backup!

## This System

This System should be an BackupSystem wich perfectly fits MY requirements: Partials, Full, FTP, Automated
Implemented in NodeJs to give more flexibility

## Features

- [x] Specified Entry Points: Points wich can be set were the Backup get recursively made
- [ ] Partial Backups: Only the files wich have been edited since the latest backup
- [ ] Full Backup: A Full Backup from all the files and the folder structure
- [ ] Rollback: A Full Rollback system from all the files and the folder structure
- [ ] Time Rollback: A Rollback to a specific time
- [ ] Setup all the config stuff in seperate objects
  - [ ] Move the excluding stuff into the single tasks
- [ ] Implement a file watching system
  - [ ] When files gets updated upload it automatically: More of an Keep in Sync than an actual Backup plan
