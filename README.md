## Create project with nextJs

yarn create next-app next-e-commerce
cd next-e-commerce

### Clear project
delete files created automatically by nextjs
/public/vercel.svg
styles/globals.css
styles/Home.module.css
remove from the files the imports of the css files that were deleted
create scr folder in root dir and move pages, public and styles folders into scr

### Change the content of index.js to
```js
export default function Home() {
  return (<div>Hello Word</div>  )
}
```

### Add typescript
yarn add -D typescript @types/react @types/node
change file extension from:
 js to tsx

run yarn dev NextJs detects TypeScript in your project and creates a tsconfig.json file for you

## your project is ready to be coded
