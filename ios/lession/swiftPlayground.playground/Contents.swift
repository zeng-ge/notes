import Foundation

let date = Date()
let calendar = Calendar.current
let year = calendar.component(.year, from: date)
let month = calendar.component(.month, from: date)
let day = calendar.component(.day, from: date)

//print("\(year)-\(month)-\(day)")

let dateformat = DateFormatter()
let timeformat = DateFormatter()
dateformat.dateFormat = "EEEE, MMMM dd"
timeformat.dateFormat = "HH:mm"
let dateString = dateformat.string(from: date)
let timeString = timeformat.string(from: date)
//print(dateString)
//print(timeString)


struct Product{
    var barcode: String
    var name: String
    var unit: String
    var price: Float32
}

struct Promotion{
    var type: String
    var barcodes: [String]
}

//结构体里面的值是不会改变的，所以只能用class来定义ProductItem,类必须要有init函数，相当于constructor
class ProductItem{
    var product: Product
    var number: Int8
    var total: Float32 = 0
    var discount: Float32 = 0
    init(product: Product, number: Int8) {
        self.product = product
        self.number = number
    }
}

let productList: [Product] = [
    Product(barcode: "ITEM000000", name: "可口可乐", unit: "瓶", price: 3.00),
    Product(barcode: "ITEM000001", name: "雪碧", unit: "瓶", price: 3.00),
    Product(barcode: "ITEM000002", name: "苹果", unit: "斤", price: 5.50),
    Product(barcode: "ITEM000003", name: "荔枝", unit: "斤", price: 15.00),
    Product(barcode: "ITEM000004", name: "电池", unit: "个", price: 2.00),
    Product(barcode: "ITEM000005", name: "方便面", unit: "袋", price: 4.50)
]


let promotionList: [Promotion] = [
    Promotion(type: "BUY_TWO_GET_ONE_FREE", barcodes: ["ITEM000000", "ITEM000001"]),
    Promotion(type: "OTHER_PROMOTION", barcodes: ["ITEM000003", "ITEM000004"]),
]

let buyedProducts: [String] = [
    "ITEM000001",
    "ITEM000001",
    "ITEM000001",
    "ITEM000001",
    "ITEM000001",
    "ITEM000003-2",
    "ITEM000005",
    "ITEM000005",
    "ITEM000005"
]

func getProductByCode(barcode: String) -> Product {
    //字符串比较低用==和!=，不能用===
    let products: [Product] = productList.filter({ $0.barcode == barcode })
    return products[0]
}

func parseBarcode(barcode: String) -> (barcode: String, number: Int8) {
    var code: String = barcode
    var number: Int8 = 1;
    if barcode.contains("-") {
        var codes = barcode.split(separator: "-")
        code = String(codes[0])
        number = Int8(String(codes[1]))! //解包，强制转化并保证一定有值，不加报错alue of optional type 'Int8?' must be unwrapped to a value of type 'Int8'
    }
    
    return (barcode: code, number)
}

func groupProducts(productCodes: [String]) -> [String: ProductItem]{
    var productItems: [String: ProductItem] = [:];
    for barcode in productCodes {
        let result = parseBarcode(barcode: barcode)
        let productBarcode = result.barcode;
        let number = result.number
        var productItem = productItems[barcode];
        if productItem != nil {
            productItem!.number += number;
        } else {
            let product: Product = getProductByCode(barcode: productBarcode);
            productItem = ProductItem(product: product, number: number)
            productItems[productBarcode] = productItem;
        }
    }
    return productItems
}

func getProductPromotion(barcode: String) -> Promotion? {
    var item: Promotion? //不加?就必须初始化，但是又不能给nil，所以只能用?来标明它可有可无
    for promotion in promotionList {
        print(promotion)
        let barcodes: [String] = promotion.barcodes
        //barcodes.first(where: { $0 == barcode }) 找出第一个元素，可能是nil
        if barcodes.contains(barcode) {
            item = promotion
            break
        }
    }
    return item
}

func calcuateProductPrice(productItem: ProductItem) -> (total: Float32, discount: Float32) {
    var total: Float32 = 0
    var discount: Float32 = 0
    let price: Float32 = productItem.product.price
    let number: Int8 = productItem.number
    
    total = price * Float32(number)
    
    let promotion = getProductPromotion(barcode: productItem.product.barcode)
    if promotion != nil {
        switch promotion!.type {
            case "BUY_TWO_GET_ONE_FREE":
                if number > 1 {
                    total -= price
                }
                discount = price
                break
            case "OTHER_PROMOTION":
                if number > 4 {
                    total -= price
                }
                discount = price
                break
            default:
                break
        }
        
    }
    return (total, discount)
}

func calculateProductsPrice(productItems: [String: ProductItem]) -> [String: ProductItem]{
    for (_, productItem) in productItems { //对象遍历时前面是key，后面是value
        let result = calcuateProductPrice(productItem: <#T##ProductItem#>)
        productItem.total = result.total
        productItem.discount = result.discount
    }
    return productItems
}

// 无返回值时不需要 -> , 有返回值时才用->
func printReceipt(products: [String]) {
    let productItems: [String: ProductItem] = groupProducts(productCodes: products)
    print("***<没钱赚商店>收据***")
    var sum: Float32 = 0
    var reduce: Float32 = 0
    for (_, productItem) in productItems { //没用的变量可以用_来占位，如这里的key
        let product = productItem.product
        let number = productItem.number
        let total: Float32 = product.price * Float32(number) //相同数据类型才能相乘，所以要将整数转成数字
        sum += total
        if number > 1 {
            reduce += product.price
        }
        print("名称：\(product.name)，数量：\(number)瓶，单价：\(product.price)(元)，小计：\(total)(元)")
    }
    print("""
        ----------------------
        总计：\(sum)(元)
        节省：\(reduce)(元)
        **********************
        """)
}

printReceipt(products: buyedProducts)
