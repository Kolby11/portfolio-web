export type LogoObject = {
  name: string
  glbPath: string
}

const typescriptLogo: LogoObject = {
  name: 'Typescript',
  glbPath: '/objects/typescript_logo.glb',
}

const pythonLogo: LogoObject = {
  name: 'Python',
  glbPath: '/objects/python_logo.glb',
}

const svelteLogo: LogoObject = {
  name: 'Svelte',
  glbPath: '/objects/svelte_logo.glb',
}

const csharpLogo: LogoObject = {
  name: 'CSharp',
  glbPath: '/objects/csharp_logo.glb',
}

// const rustLogo = '/static/objects/rust_logo.obj'

// export const programmingLangugagesLogos: string[] = [pythonLogo, typescriptLogo, rustLogo]
export const programmingLangugagesLogos: LogoObject[] = [typescriptLogo, pythonLogo, svelteLogo, csharpLogo]
