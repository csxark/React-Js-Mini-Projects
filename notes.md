#### create a new project
```bash 
#to set the execution policy to allow scripts to run
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
#to create a new project 
npm create vite@latest 

```
#### install the dependencies
```bash
npm install
```
#### run the project
```bash
npm run dev
```
### adding tailwind css
```bash
npm install tailwindcss @tailwindcss/vite
```
### add the tailwind in vite.config.js
```javascript
import tailwindcss from '@tailwindcss/vite'
// add this to plugin
 tailwindcss(),
```

### add the tailwind directives to the css file
```bash
# ./src/index.css 
@import "tailwindcss";
```

### add react router
```bash
npm install react-router-dom
```

