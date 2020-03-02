# Divorce Predictors Using Machine Learning

by Rachel Hunter, Rachel Trindle, and Michelle Trujillo

# Project Summary
The Divorce Predictors Data Set originally appeared in a 2019 study by Yöntem et. al. Researchers collected responses from 170 individuals through a "Personal Information Form" that incorporated a Divorce Predictors Scale developed by the researchers and based on Gottman Couples Therapy, a model that explains divorce based on empirical research. Our project asks the question, "Can machine learning be used to predict whether a couple is headed toward divorce?" What follows is an explanation of forecasting models used, visual exploration of the data, and a summary explaining our findings and identifying areas for further research.

# Link to Data Source
https://archive.ics.uci.edu/ml/datasets/Divorce+Predictors+data+set

# Link to live website
https://hunterracheld.github.io/machine-learning-project/models.html

# Sitemap
- Introduction
- Models
- Exploration (Tableau)
- Summary

# Process
- Upload data to jupyter notebook with pandas
- Pre-process data (train_test_split)
- Make predictions using three different algorithms, first on all features, then on top 5 features
- Adjust source data to be visualized in Tableau
- Compile classification reports and visualizations into a website hoted by github

# Summary
- Because responses were consistent among married and divorced couples, it is very likely that we could use a different set of top five features and receive the same results.
- The consistency in responses also might cause feature importance to return a different set of top five features each time it is ran.
- Many responses don’t seem sensible at first glance but are reinforced by the results of the models. This suggests that cultural influences might be in play. (i.e. 89.5% of married couples responded that they never enjoy holidays with their spouse, while only 4.8% of divorced couples answered the same).
- Cultural norms, such as arranged marriages, can have a great impact on responses and therefore predictions of future data. Turkey has a lot of cultural norms around marriage that are rapidly changing.

