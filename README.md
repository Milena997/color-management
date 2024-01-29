# color-management
The Color Manager App is a simple ReactJS application that allows users to manage a list of colors. Each color has a name and a hex value, and users can perform operations such as adding, deleting, and filtering colors.

## How to start
Detailed instructions can be find in the sub [readme file](https://github.com/Milena997/color-management/blob/main/react-color-manager/README.md)

 ## Technical specification
  - The project is written in ReactJS
- Data state managed by React Context API
- Tailwind CSS used for management of the CSS
- Added eslint as code-checking tool

## Web Sockets

App is using test web socket available on https://socketsbay.com/test-websockets, 
This is echo web socket that returns any sent message.

On app startup web socket object is created in useWebSocket hook. This object has definitions of all event functions (on open, on message, on close, on error). If socket receives the message it will be printed in the console log.
