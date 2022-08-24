# Overview
[![wakatime](https://wakatime.com/badge/user/2009fdf2-8d6f-4d87-9435-7ec784a9054f/project/25dd22f2-0765-4bd7-851b-3ec7e022dc60.svg)](https://wakatime.com/badge/user/2009fdf2-8d6f-4d87-9435-7ec784a9054f/project/25dd22f2-0765-4bd7-851b-3ec7e022dc60)

A web app used to resize an image that exists locally given `width` and `height` as query params.
</br>

## Scripts


| Scripts          | Functionality                                                                      |
| ---------------- | ---------------------------------------------------------------------------------- |
| `npm install`    | Installs the necessary packages.                                                   |
| `npm run start`  | Starts the app at port 3000.                                                       |
| `npm run lint`   | Runs ESLint on all TypeScript files.                                               |
| `npm run format` | Runs Prettier on all TypeScript files to format all files.                         |
| `npm run build`  | Builds the project by transpiling TS files to JS files that are located at `dist`. |
| `npm run test`   | Runs all specs defined in `tests` folder.                                          |

## Endpoints

- `/api/editImage` should be accessed to resize the given image.
  </br>

  | Params   | Constraints                                                        |
  | -------- | ------------------------------------------------------------------ |
  | width    | Positive integer                                                   |
  | height   | Positive integer                                                   |
  | fileName | String (Note that the file name should exist at /images directory) |

## Example

  </br>

- Try to access `http://localhost:3000/api/editImage?width=500&height=200&fileName=Naruto` and check `/thumbnails` directory. The image is then cached to that folder for future retrieval.
