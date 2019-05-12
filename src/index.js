import bgImage from './asset/images/webpack.jpg'
import './asset/styles/commom.scss'

const foo = () => {
  return 'hello webpack'
}

const root = document.getElementById('app')

const img = new Image()
img.src = bgImage

const p = document.createElement('p')
p.innerText = foo()

root.append(img)
root.append(p)