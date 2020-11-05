library(jsonlite)

votd <- 'https://public.tableau.com/api/gallery?'
votd_df <- jsonlite::fromJSON(votd)