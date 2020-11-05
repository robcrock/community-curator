<h1 style="font-weight:normal">
  Tableau Public Community Curator
</h1>
 
[![Status](https://img.shields.io/badge/status-active-success.svg)]() [![GitHub Issues](https://img.shields.io/github/issues/robcrock/community-curator.svg)](https://github.com/robcrock/community-curator/issues) [![GitHub Pull Requests](https://img.shields.io/github/issues-pr/robcrock/community-curator.svg)](https://github.com/robcrock/community-curator/pulls)

This repo for building a curation of content available on Tableau Public, utilising the Tableau Public API. 

### :a: About

Tableau Public is the free version of Tableau's Desktop product, it allows for the creation and distribution of Tableau dashboards. The platform allows the following of other authors but it harder to find new users to follow aside from looking on social media or monitoring Tableau Public's Featured Authors and Viz Of The Day.

The motivation behind this project is to enable easier discovery of new authors and inspiring workbooks (either by design, functionality or use case).

### :wrench: Tableau Public API

The majority of Tableau Public's user data is available through a publically accessible API, currently being documented here: [https://github.com/wjsutton/tableau_public_api](https://github.com/wjsutton/tableau_public_api) 

Using this API and a Tableau Public username we can extract details of the user's Tableau workbooks, who they follow, who's following them, their favourite Tableau Public vizzes, and images of all their workbooks.

### :book: Content Curations

From early thoughts there are many different types of curations of Tableau Public content available, e.g. the default curations available on the Tableau Public platform are:

- a list of workbooks published by accounts by users you follow
- a list of workbooks favourited by accounts by users you follow

In part, many other curations could be incorporated, to the extent that we may be building a Netflix style view of content, in which Tableau Public Content has been curated into different groups of 'rails' (like on Netflix).

#### Curations to test

Building from Tableau Curations:

- New & favourited vizzes from Tableau Featured Authors
- New & favourited vizzes from Tableau VOTD Authors
- New & favourited vizzes from Tableau Ironviz Top 10s (or all entrants)

Building from users existing followers

- New vizzes from accounts your followers follow but you don't

Building from Community Projects:

- New #MakeoverMonday vizzes from Twitter
- New #SportsVizSunday vizzes from Twitter
- New #WorkoutWednesday vizzes from Twitter
- New #ProjectHealthViz vizzes from Twitter
- New #IronQuest vizzes from Twitter
- New #VizforSocialGood vizzes from Twitter
- New #VizforSocialGood vizzes from Twitter
- New #TheSDGVizProject vizzes from Twitter
- any I've missed?

Building from image metadata (if possible!):

- New mobile sized designed vizzes
- New long-form designed vizzes
- New wide-form designed vizzes


