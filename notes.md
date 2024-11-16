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
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```
### add the tailwind directives to the css file
```bash
# ./src/index.css 
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### add react router
```bash
npm install react-router-dom
```

