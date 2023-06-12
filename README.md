<img src="https://raw.githubusercontent.com/micheleriva/vue-product-spinner/HEAD/public/gif/Vue-Product-Spinner.gif" align="center"/>

# React Product Spinner

[![npm version](https://img.shields.io/npm/v/react-product-spinner.svg)](https://www.npmjs.com/package/react-product-spinner)
[![license](https://img.shields.io/github/license/your-username/react-product-spinner.svg)](https://github.com/your-username/react-product-spinner/blob/main/LICENSE)

A customizable product spinner component for React.

# Live Demo

https://react-product-spinner.netlify.app

## Installation

```bash
npm install react-product-spinner
```

#Usage

```
import ReactProductSpinner from 'react-product-spinner';

const productImages= [
  "https://example.com/image1.jpg",
  "https://example.com/image2.jpg",
  "https://example.com/image3.jpg",
  "https://example.com/image4.jpg",
    "https://example.com/image5.jpg",
]

// Example usage
function App() {
  return (
    <div>
      <h1>My Product Page</h1>
      <ReactProductSpinner images={productImages} infinite={true} speed={3} />
      {/* Additional content */}
    </div>
  );
}
```

# props

| Prop Name   | Type       | Is Required | Default Value | Description                        |
| ----------- | ---------- | ----------- | ------------- | ---------------------------------- |
| images      | `string[]` | `required`  | `[]`          | An array of images to be displayed |
| infinite    | `Boolean`  | optional    | `true`        | Infinite loop                      |
| speed       | `Number`   | optional    | `3`           | Rotation speed                     |
| touchDrag   | `Boolean`  | optional    | `true`        | Handle touch events                |
| mouseWheel  | `Boolean`  | optional    | `true`        | Handle mouse wheel events          |
| mouseDrag   | `Boolean`  | optional    | `true`        | Handle mouse drag events           |
| slider      | `Boolean`  | optional    | `false`       | Show slider input                  |
| sliderClass | `String`   | optional    |               | Custom slider CSS class            |

# License

This project is licensed under the MIT License - see the [LICENSE.md](/LICENSE.md) file for details.

# Contributing

Contributions are welcome! Please refer to the Contributing Guidelines for more information.

# Issues

Report any issues or feature requests on the Issues page.

# Changelog

See the Changelog file for details on version history and updates.

# Credits

https://github.com/micheleriva/vue-product-spinner/ --(micheleriva)

Ensure to replace the placeholder URLs, such as the npm package version badge, license badge, repository links, and author links, with the appropriate URLs specific to your package.

Feel free to further customize the content, styling, and organization of the `README.md` file to best convey the information and provide a clear understanding of your React Product Spinner npm package.
