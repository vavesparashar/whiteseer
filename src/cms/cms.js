import { init, registerEditorComponent } from 'netlify-cms-app'

import { Figure } from 'netlify-cms-editor-component-figure';

registerEditorComponent(Figure);

init({
  config: {
    backend: {
      name: 'github',
      repo: 'vavesparashar/colbyfayock.com'
    },
    load_config_file: false,
    display_url: 'https://whiteseer.com',
    media_folder: 'static/assets',
    public_folder: '/assets',
    collections: [
      {
        name: 'post',
        label: 'Post',
        folder: 'src/_posts',
        create: true,
        fields: [
          {
            name: 'template',
            label: 'Template',
            widget: 'hidden',
            default: 'post'
          },
          {
            name: 'title',
            label: 'Title'
          },
          {
            name: 'date',
            label: 'Date',
            widget: 'date'
          },
          {
            name: 'category',
            label: 'Category',
            widget: 'select',
            options: [
              {
                label: 'works',
                value: 'works'
              },
              {
                label: 'Basics',
                value: 'Basics'
              },
              {
                label: 'Photography',
                value: 'photography'
              },
              {
                label: 'Lessons',
                value: 'Lessons'
              },
              {
                label: 'UI Design',
                value: 'ui-design'
              },
              {
                label: 'Updates',
                value: 'updates'
              },
              {
                label: 'Web Design',
                value: 'web-design'
              },
            ]
          },
          {
            name: 'body',
            label: 'Body',
            widget: 'markdown'
          }
        ]
      },
      {
        name: 'talk',
        label: 'Talk',
        folder: 'src/_talks',
        create: true,
        fields: [
          {
            name: 'template',
            label: 'Template',
            widget: 'hidden',
            default: 'talk'
          },
          {
            name: 'title',
            label: 'Title',
          },
          {
            name: 'video',
            label: 'Video',
            required: false,
          },
          {
            name: 'video_embed',
            label: 'Video Embed',
            required: false,
          },
          {
            name: 'slides',
            label: 'Slides',
            required: false,
          },
          {
            name: 'link',
            label: 'Link',
            required: false,
          },
          {
            name: 'link_label',
            label: 'Link Label',
            required: false,
          },
          {
            name: 'date',
            label: 'Date',
            widget: 'date',
          },
          {
            name: 'body',
            label: 'Body',
            widget: 'markdown'
          },
          {
            name: 'category',
            label: 'Category',
            widget: 'hidden',
            default: 'talk'
          }
        ]
      },
      {
        name: 'page',
        label: 'Page',
        folder: 'src/_pages',
        create: true,
        fields: [
          {
            name: 'template',
            label: 'Template',
            widget: 'hidden',
            default: 'page'
          },
          {
            name: 'title',
            label: 'Title'
          },
          {
            name: 'path',
            label: 'Path'
          },
          {
            label: 'Body',
            name: 'body',
            widget: 'markdown'
          }
        ]
      }
    ]
  },
});