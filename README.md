[![pkm3XHP.png](https://s21.ax1x.com/2024/05/13/pkm3XHP.png)](https://imgse.com/i/pkm3XHP) 



# 区块链电子物流商品表单系统 
#### Fisco Bcos based Commodity e-form system


本系统是基于Vue+Express+FiscoBocs打造的区块链电子物流表单系统。

### 其主要实现了以下功能：

   1.登记物流数据上链保存；
  
   2.商品信息数据上链保存；

   3.追踪物流中间环节数据，物流的中途的转运运输数据将被追踪溯源，并以表格形式列出；

   4.基本的用户管理；

   5.对商品数据和物流表单数据的基本管理，包括创建、更新、终止、和状态管理。

## 部署系统：

  理论上可以全程Linux部署,但最终为了演示方便和使用ubuntu server部署区块链，最后选择了Windows + Linux 混合。
  
## 部署要求：

|软件|版本|
|-|-|
|NodeJS|18+|
|NPM|9.6+|

前后端运行基础需要的软件包：

|包名|版本|
|-|-|
|express|4.18.2+|
|vite|4.2.1+|

其他的软件包均通过NPM 管理

***

## 部署过程：

### 前端部署：
前端依次执行:
```bash
cd client
npm install --legacy-peer-deps
npm run dev
```
前端服务将在 `http://localhost:8000` 启动。

### 后端部署：
进入 server 目录，配置数据库连接。已预配置的 `.env` 文件：

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=123456
DB_NAME=deliverydb
```

修改 `/config/db.js` 中的数据库配置（如需自定义）：

```javascript
module.exports = {
    HOST: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    PASSWORD: process.env.DB_PASSWORD || "123456",
    DB: process.env.DB_NAME || "deliverydb",
    dialect: "mysql",
}
```

修改 `/config/WeBase.js` 中的 WeBase 配置：

```javascript
const account = "admin";                    // WeBase 用户名
const accountPwd = "admin";                 // WeBase 密码
const groupId = 1;                          // 操作的群组 ID
const contractAddr = "0x...";               // 合约地址
```

在 server 目录下执行：
```bash
npm install
node app.js
```

后端服务将在 `http://localhost:8002` 启动。
## 区块链端部署：
参考webase的官方文档完整部署章节[WeBaseDoc](https://webasedoc.readthedocs.io/zh-cn/lab/docs/WeBASE/install.html)
部署完成后需要修改两个文件：
1.webase-node-mgr的conf下的application.yml:
```
....
Spring:
       ....
        url:....     #最后面加上&useSSL=false
....
enableVerficationCode: false
```
同理在webase-sign的conf下的同名文件的spring下的字段也是一样的

若是虚拟机，请开放虚拟机端口5000-5004

若是远程服务器，请修改webase.js的内的各项接口的连接地址

合约的部署可在webase浏览器端直接完成，不在赘述
## 合约部署：
### 部署顺序：
```
1.CommodityInfo.sol
2.LogisticsInfo.sol
3.LogisticsForm.sol
```

---

## 项目配置信息

### 数据库配置
- **数据库名称**：`deliverydb`
- **主机**：`localhost`
- **用户**：`root`
- **密码**：`123456`
- **方言**：`mysql`

### 服务配置
| 服务 | 地址 | 端口 |
|------|------|------|
| 前端 | http://localhost:8000 | 8000 |
| 后端 | http://localhost:8002 | 8002 |
| WeBase | http://192.168.58.128:5001 | 5001 |
| MySQL | localhost | 3306 |

### 默认用户账户

所有用户密码均为 `123456`，所有用户均已上链到 WeBase。

| 用户名 | 手机号 | 角色 | 链上地址 |
|--------|--------|------|---------|
| admin | 18888888888 | 管理员 | `0xfa6f67fdd76a25772c4eee46ea681f2e7c85c13f` |
| user1 | 18888888889 | 普通用户 | `0x06bbf74eedd97cbba60f9ac13b1fdac1a0dacbb5` |
| transit1 | 18888888890 | 运输方 | `0xcba2885939a5ddc73d78488a73fb3feef811e198` |

### 示例数据

系统已预置 3 个示例商品和 3 条物流路线：

**商品**：
- 新鲜苹果（条形码：APPLE-001）
- 有机蔬菜（条形码：VEG-001）
- 冷链牛奶（条形码：MILK-001）

**物流路线**：
- 北京 → 北京分拨中心 → 上海
- 济南 → 青岛分拨中心 → 广州
- 杭州 → 宁波分拨中心 → 深圳

---

## 项目结构

```
BlockChain-logistics-eForm-main/
├── client/                    # 前端项目（Vue 3 + Vite）
│   ├── src/
│   │   ├── components/        # Vue 组件
│   │   ├── pages/             # 页面
│   │   ├── router/            # 路由配置
│   │   └── main.js            # 入口文件
│   ├── vite.config.js         # Vite 配置
│   └── package.json
├── server/                    # 后端项目（Express）
│   ├── config/                # 配置文件
│   │   ├── db.js              # 数据库配置
│   │   └── WeBase.js          # WeBase 配置
│   ├── controller/            # 控制器
│   ├── models/                # 数据模型
│   ├── routes/                # 路由
│   ├── app.js                 # 应用入口
│   └── package.json
├── CommodityInfo.sol          # 商品信息合约
├── LogisticsInfo.sol          # 物流信息合约
├── LogisticsForm.sol          # 物流表单合约
└── README.md                  # 项目说明

```

---

## 技术栈

### 前端
- Vue 3
- Vite
- Element Plus
- Axios

### 后端
- Node.js
- Express
- Sequelize
- MySQL

### 区块链
- WeBase（FISCO BCOS）
- Solidity 智能合约

---

## 功能特性

✅ 用户注册和登录（支持管理员、普通用户、运输方）
✅ 商品信息管理（创建、查询、更新）
✅ 物流表单管理（创建、追踪、更新状态）
✅ 区块链上链存储（所有数据均上链）
✅ 商品溯源追踪（查看商品完整的物流链路）
✅ 物流中间环节追踪（实时追踪运输过程）
✅ 用户权限管理（基于角色的访问控制）

---

## 快速开始

### 1. 克隆项目
```bash
git clone https://github.com/win-been/webase-logistics-transport-system.git
cd BlockChain-logistics-eForm-main
```

### 2. 安装依赖
```bash
# 后端
cd server
npm install

# 前端
cd ../client
npm install --legacy-peer-deps
```

### 3. 配置数据库
确保 MySQL 已安装并运行，创建 `deliverydb` 数据库。

### 4. 启动服务
```bash
# 终端 1：启动后端
cd server
node app.js

# 终端 2：启动前端
cd client
npm run dev
```

### 5. 访问应用
打开浏览器访问 `http://localhost:8000`

---

## 许可证

MIT

---

## 联系方式

如有问题或建议，欢迎提交 Issue 或 Pull Request。
