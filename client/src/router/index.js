import React from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';

import Layout from 'container/layout/Layout';
import {
  AboutMe,
  ArchiveList,
  ArticleContent,
  ArticleList,
  FeedbackForm,
  TagList,
} from 'components';

const EnterRouter = () => (
  <Router>
    <Layout>
      <Route exact path="/" component={ArticleList} />
      <Route path="/article/:pathName" component={ArticleContent} />
      <Route path="/feedback" component={FeedbackForm} />
      <Route path="/taglist" component={TagList} />
      <Route path="/archive" component={ArchiveList} />
      <Route path="/about" component={AboutMe} />
    </Layout>
  </Router>
);

export default EnterRouter;
