# Get Tableau Public profiles from featured authors URL:
# https://public.tableau.com/en-us/s/authors#!/

library(jsonlite)
source('function_get_tableau_public_api_extract.R')
source('function_get_last_n_tableau_vizs_extract.R')
source('function_get_tableau_viz_screenshot_url.R')
source('function_get_tableau_viz_thumbnail_url.R')

featured_authors_call <- 'https://public.tableau.com/s/authors/list/feed?'
featured_authors_data <- jsonlite::fromJSON(featured_authors_call)

featured_authors <- featured_authors_data$authors$profile_name

for(i in 1:length(featured_authors)){
  featured_df <- get_last_n_tableau_vizs_extract(featured_authors[i],20)
  
  for(j in 1:length(featured_df$workbooks)){
    screenshot <- get_tableau_viz_screenshot_url(featured_df$workbooks[j])
    thumbnail <- get_tableau_viz_thumbnail_url(featured_df$workbooks[j])
    
    images <- data.frame(workbooks = featured_df$workbooks[j],
                         workbook_screenshot = screenshot, 
                         workbook_thumbnail = thumbnail, 
                         stringsAsFactors = F)
    
    if(j == 1){
      images_df <- images
    }
    if(j != 1){
      images_df <- rbind(images_df,images)
    }
  }
  
  featured_df <- inner_join(featured_df,images_df, by = ("workbooks" = "workbooks"))
  
  if(i == 1){
    featured_output <- featured_df 
  }
  if(i != 1){
    featured_output <- rbind(featured_output,featured_df)
  }
}

featured_output$last_publish_datetime <- as.POSIXct(featured_output$last_publish/1000, origin="1970-01-01")
featured_output <- arrange(featured_output,-last_publish)

write.csv(featured_output,"featured_authors_feed.csv",row.names = F)