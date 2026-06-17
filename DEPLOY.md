# MapMyJourney 部署指南

## 已完成

- ✅ 代码已推送至 GitHub: https://github.com/Liangzai0097/mapmyjourney
- ✅ `npm run build` 编译通过
- ✅ `.env` 敏感文件已 gitignore

## 部署步骤

### 第 1 步：配置 Dodo Payments（获取密钥）

1. 访问 https://dashboard.dodopayments.com 注册/登录
2. 进入 **Settings → API Keys**，获取：
   - **API Key** → 填入 `DODO_PAYMENTS_API_KEY`
   - **Webhook Key** → 填入 `DODO_PAYMENTS_WEBHOOK_KEY`
3. 进入 **Products**，创建一个产品：
   - 名称：`HD Export Unlock`
   - 价格：`$5.00`（一次性付款）
   - 类型：Digital
   - 创建后复制 **Product ID**（格式 `pdt_xxx`）→ 填入 `DODO_PRODUCT_ID_HD`
4. 进入 **Webhooks**，添加 webhook URL：
   - 测试环境：`http://localhost:3000/api/webhook`
   - 生产环境（部署后填）：`https://你的域名/api/webhook`

### 第 2 步：部署到 Vercel

1. 访问 https://vercel.com 用 GitHub 账号登录
2. 点 **Add New → Project**
3. 选择 `Liangzai0097/mapmyjourney` 仓库 → **Import**
4. Framework Preset 自动识别为 **Next.js**，无需改配置
5. 展开 **Environment Variables**，依次添加以下 5 个变量：

| Name | Value | 说明 |
|------|-------|------|
| `DODO_PAYMENTS_API_KEY` | `你的 API Key` | Dodo 后台获取 |
| `DODO_PAYMENTS_WEBHOOK_KEY` | `你的 Webhook Key` | Dodo 后台获取 |
| `DODO_PRODUCT_ID_HD` | `pdt_xxx` | Dodo 产品 ID |
| `DODO_ENVIRONMENT` | `test_mode` | 先用测试模式，验证后改 `live_mode` |
| `NEXT_PUBLIC_APP_URL` | `https://你的域名.vercel.app` | 部署后获取，第一次可留空 |

6. 点 **Deploy**，等待 1-2 分钟构建完成
7. 部署成功后会得到一个 `xxx.vercel.app` 域名

### 第 3 步：配置生产环境 Webhook

1. 拿到 Vercel 域名后（如 `https://mapmyjourney.vercel.app`）
2. 回到 Dodo Dashboard → Webhooks
3. 添加生产 webhook URL：`https://mapmyjourney.vercel.app/api/webhook`
4. 回到 Vercel → Settings → Environment Variables
5. 更新 `NEXT_PUBLIC_APP_URL` 为你的正式域名
6. （可选）在 Vercel → Settings → Domains 绑定自定义域名

### 第 4 步：测试支付流程

**测试模式（DODO_ENVIRONMENT=test_mode）：**

1. 打开你的 Vercel 域名
2. 标记几个国家，点下载（验证免费下载正常）
3. 再点下载（验证付费墙弹出）
4. 点 **Unlock Now** → 跳转 Dodo 测试支付页
5. 用 Dodo 提供的测试卡号完成支付
6. 跳回 `/success` 页面 → 验证解锁成功
7. 再次下载 → 验证无水印 + 无限次数

**切换到生产模式：**

1. 测试通过后，在 Vercel 把 `DODO_ENVIRONMENT` 改为 `live_mode`
2. Dodo 后台确认账户已激活（完成实名/银行验证）
3. 重新部署（Vercel 会自动触发）

### 第 5 步：验证清单

- [ ] 首页正常加载，世界地图可点击涂色
- [ ] 双击中国/美国 → 省份地图居中显示
- [ ] 省份地图可拖动、滚轮缩放、按钮缩放
- [ ] 悬停省份显示名称浮层
- [ ] 3 种样式切换正常（Minimalist/Vintage/Watercolor）
- [ ] 首次免费下载成功（带水印）
- [ ] 第二次下载被挡 → 付费墙弹出
- [ ] 支付完成 → /success 页面 → 解锁
- [ ] 付费后下载无水印 + 无限次数
- [ ] 分享链接可还原状态

## 本地开发

```bash
# 安装依赖
npm install --legacy-peer-deps

# 创建 .env.local 填入测试密钥
cp .env.example .env.local
# 编辑 .env.local 填入真实值

# 启动开发服务器
npm run dev

# 生产构建
npm run build && npm start
```

## 技术栈

- Next.js 16 (App Router) + TypeScript
- react-simple-maps + d3-geo（地图渲染）
- Zustand（状态管理 + localStorage 持久化）
- html-to-image（图片导出）
- Dodo Payments（支付）
- Tailwind CSS + shadcn/ui（UI）
- Vercel（托管）
