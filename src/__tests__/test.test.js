const fs = require('fs');
import {screen, getByRole} from '@testing-library/dom'

beforeEach(() => {
  const fileContent = fs.readFileSync('src/index.html', 'utf8');
  const cssContent = fs.readFileSync('src/css/estilo.css', 'utf-8')
  

  const style = document.createElement("style")
  style.innerHTML = cssContent

  
  document.head.appendChild(style)

  document.body.innerHTML = fileContent
  
  const jsContent = fs.readFileSync('src/js/script.js', 'utf-8')
  const f = new Function('', `${jsContent}`)
  f()

});

afterEach(() => {
  // cleanup on exiting
   document.body.innerHTML = ""
   document.head.innerHTML = ""
});



test('A lista não está vazia', () => {
  const list = screen.getAllByRole("listitem");
  expect(list.length).toBeGreaterThan(0)
})

test('Existe um botão de remover para cada item da lista', () => {
  const list = screen.getAllByRole("listitem");
  for (const item of list) {
    const button = getByRole(item, "button")
    expect(button.innerHTML).toBe("Remover")
  }
})

test('Removendo um item da lista', () => {
  const itens = document.getElementsByTagName("li")
  const totalDeItens = itens.length
  const button = document.querySelector("button");
  button.click()
  expect(totalDeItens).toBe(itens.length + 1)
})

test('Removendo todos os itens da lista', () => {
  const itens = document.getElementsByTagName("li")
  const buttons = document.querySelectorAll("button");
  for(const button of buttons) {
    button.click()
  }
  expect(itens.length).toBe(0)
})

