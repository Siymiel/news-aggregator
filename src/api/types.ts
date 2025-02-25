export interface NewsApiArticle {
  author: string | null;
  content: string;
  description: string;
  publishedAt: string;
  source: {
    id: string | null;
    name: string;
  };
  title: string;
  url: string;
  urlToImage: string;
}

export interface GuardianNewsArticle {
  apiUrl: string;
  id: string;
  isHosted: boolean;
  pillarId: string;
  pillarName: string;
  sectionId: string;
  sectionName: string;
  type: string;
  webPublicationDate: string;
  webTitle: string;
  webUrl: string;
}

export interface NYTNewsArticle {
  abstract: string;
  byline: {
    original: string;
    person: Array<{ firstname?: string; lastname?: string; role?: string }>;
    organization: string | null;
  };
  document_type: string;
  headline: {
    main: string;
    kicker: string | null;
    content_kicker: string | null;
    print_headline: string;
    name: string | null;
  };
  keywords: Array<{ name: string; value: string }>;
  lead_paragraph: string;
  multimedia: Array<{ url: string; format: string; type: string }>;
  news_desk: string;
  print_page: string;
  print_section: string;
  pub_date: string;
  section_name: string;
  snippet: string;
  source: string;
  subsection_name: string;
  type_of_material: string;
  uri: string;
  web_url: string;
  word_count: number;
  _id: string;
}
