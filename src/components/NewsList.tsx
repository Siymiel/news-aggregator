import React from "react";

interface Article {
  title: string;
  description: string;
  url: string;
  source: string;
  category: string;
  author: string;
  publishedAt: string;
}

interface Props {
  articles: Article[];
}

const NewsList: React.FC<Props> = ({ articles }) => {
  return (
    <div className="max-w-4xl pr-4">
      {articles.length === 0 ? (
        <p className="text-black text-lg">No articles found.</p>
      ) : (
        articles.map((article, index) => (
          <div key={index} className="border-b pb-4 mb-4">
            <h2 className="text-lg font-semibold text-black">
              {article.title}
            </h2>
            {/* <p className="text-black">{article.description}</p> */}
            <p className="text-sm text-gray-500 pt-1">
              Source: {article.source} | Author: {article.author}
            </p>
            <p className="text-sm text-gray-500">
              Published: {new Date(article.publishedAt).toLocaleDateString("en-US", {
                weekday: "short",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500"
            >
              Read More
            </a>
          </div>
        ))
      )}
    </div>
  );
};

export default NewsList;
