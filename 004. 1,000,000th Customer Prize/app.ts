import { ReadFile } from '../Common/common'

ReadFile.Read(__dirname, 'products.csv', (data) => Redmart.Main(data))

const maxVolume = 45 * 30 * 35

class Product {
  constructor (
    public productId: number,
    public price: number,
    public length: number,
    public width: number,
    public height: number,
    public weight: number
  ) {}
}

class Redmart {
  private static products: Product[] = [];
  private static count = 0;
  public static Main (input: string[]) {
    this.readCsv(input)
    const wt = this.products.map(
      (product) => product.width * product.length * product.height
    )
    const val = this.products.map((product) => product.price)
    const result = this.knapSack(maxVolume, wt, val, this.products.length)
    console.log(result)
  }

  private static knapSack (W: number, wt: number[], val: number[], n: number) {
    const k: number[][] = []
    for (let i = 0; i <= n; i++) {
      console.log(i)
      k[i] = []
      for (let w = 0; w <= W; w++) {
        if (i === 0 || w === 0) {
          k[i][w] = 0
        } else if (wt[i - 1] <= w) {
          k[i][w] = Math.max(val[i - 1] + k[i - 1][w - wt[i - 1]], k[i - 1][w])
        } else {
          k[i][w] = k[i - 1][w]
        }
      }
    }
    return k[n][W]
  }

  private static readCsv (input: string[]) {
    input.forEach((line) => {
      const [productId, price, length, width, height, weight] = line.split(',')
      const product = new Product(
        parseInt(productId),
        parseInt(price),
        parseInt(length),
        parseInt(width),
        parseInt(height),
        parseInt(weight)
      )
      if (product.length <= 45 && product.width <= 30 && product.height <= 35) {
        this.products.push(product)
      }
    })
  }
}
