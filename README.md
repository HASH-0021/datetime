# DATETIME

## Description
This is a web-app consisting of various tools and features related to date and time _(detailed overview of features are present in [Features Overview](README.md#features-overview) section)_. New features and tools will be added in future.

## Development
- Libraries/Packages used  :  Create React App, Material UI, GitHub pages
- Hosted website  :  [DateTime website](https://hash-0021.github.io/datetime/)
- CI/CD Status    :  ![CI/CD Status](https://github.com/HASH-0021/datetime/workflows/CI/CD/badge.svg)

## Features Overview
- **Current Date and Time** _(displays date and time of client browser)_
  - Date
    - Format selector
    - Include day of the week
    - Separator selector _(disabled for certain date formats)_
  - Time
    - Include milli-seconds
    - Format selector
    - Include timezone
- **Stopwatch**
  - Start/Pause/Resume
  - Reset _(disabled when stopwatch hasn't started)_
  - Include milli-seconds
  - Separator selector
- **Timer**
  - Start/Pause/Resume _(start button is disabled when timer input has invalid value)_
  - Reset _(disabled when timer hasn't started)_
  - Include milli-seconds
  - Separator selector
- **Year Status** _(displays status of the year with sections showing how much time has been completed and remaining)_
  - Format selector
  - Progress bar _(indicates progress of the year)_
