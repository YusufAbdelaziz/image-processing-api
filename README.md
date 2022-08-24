# Overview

A web app used to an resize image that exists locally given `width` and `height` as query params.
</br>

---

  </br>

## Scripts

  </br>

| Scripts          | Functionality                                                           |
| ---------------- | ----------------------------------------------------------------------- |
| `npm install`    | Installs the necessary packages.                                        |
| `npm run start`  | Starts the app at port 3000.                                            |
| `npm run lint`   | Runs ESLint on all TypeScript files.                                    |
| `npm run format` | Runs Prettier on all TypeScript files to format all files.              |
| `npm run build`  | Transpiles TS files to JS files located at dist and builds the project. |
| `npm run test`   | Runs all specs defined in `tests` folder.                               |

---

## Endpoints

  </br>

- `/api/editImage` should be accessed to resize the given image.
  </br>

  | Params   | Constraints                                                        |
  | -------- | ------------------------------------------------------------------ |
  | width    | Positive integer                                                   |
  | height   | Positive integer                                                   |
  | fileName | String (Note that the file name should exist at /images directory) |

---

## Example

  </br>

- Try to access `http://localhost:3000/api/editImage?width=500&height=200&fileName=Naruto` and check `/thumbnails` directory. The image is then cached to that folder for future retrieval.
