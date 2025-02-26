import { NewsApiArticle, GuardianNewsArticle, NYTNewsArticle } from "./api";

export type AggregatedNewsArticle = NewsApiArticle | GuardianNewsArticle | NYTNewsArticle;