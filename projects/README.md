# Projects

> _Concept:_ Pick a topic/challenge or two per week, complexity may vary. Each topic should not consume more than 4 hours to complete. Topics can be `coding`, `photo` album, `video/audio` content, or `written` content.

- [ ] Generate templates for each topic type
- [ ] Create api for CRUDing a topic, types can be `coding`, `photo`, `video/audio`, or `written`
- [ ] The topic should consist of the following fields: `id`, `status`, `created_date`, `selected_date`, `started_date`, `completed_date`, `content`, `external_links[]`.
- [ ] Allow topic api to adjust the status, which can be `created`, `selected`, `started`, `completed`
- [ ] Consume the api view the web views and display topics.
- [ ] The web root view should only display `completed` topics and possibly `started` topics with an `In progress notification`. Each type of topic may have slightly different views.
