<div align="center">

# 🚀 AWS Auto Registration - Chrome Extension

### ⚡ 一键自动化注册 AWS Builder ID 的浏览器扩展

[![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-4285F4?logo=googlechrome&logoColor=white)](https://chrome.google.com)
[![Manifest V3](https://img.shields.io/badge/Manifest-V3-green?logo=googlechrome)](https://developer.chrome.com/docs/extensions/mv3/intro/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)](https://www.javascript.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

[功能特性](#-功能特性) • [安装指南](#-安装指南) • [使用说明](#-使用说明) • [技术架构](#-技术架构) • [常见问题](#-常见问题)

</div>

---

> ⚠️ **重要提示**：目前插件的**并发多窗口功能不稳定**，可能会导致注册失败或浏览器卡顿。建议将并发窗口数设置为 **1**，待功能稳定后再使用多窗口并发。

---

## ✨ 功能特性

### 🎯 核心功能

- **🤖 全自动注册** - 从邮箱创建到 Token 获取，全程自动化，无需人工干预
- **🔄 批量注册** - 支持自定义注册数量（1-100），一键批量创建账号
- **⚡ 并发处理** - 支持多窗口并发（1-3 个），提升注册效率
- **🕵️ 无痕模式** - 自动创建无痕窗口，隔离会话，防止数据污染
- **📧 临时邮箱** - 集成 MailFly API，自动创建临时邮箱并获取验证码
- **🔐 Token 管理** - 自动获取并保存 OIDC Access Token 和 Refresh Token

### 🛡️ 高级功能

- **✅ Token 验证** - 批量验证 Token 状态，识别封禁、过期、无效账号
- **🎨 状态可视化** - 实时显示注册进度、会话状态、Token 状态
- **📊 智能导出** - 支持 JSON/CSV 格式，自动过滤无效 Token
- **💾 历史记录** - 自动保存注册历史，支持查看、复制、导出
- **🔍 详细日志** - 控制台输出详细日志，便于调试和问题排查
- **🚀 Kiro IDE 同步** - 一键同步 Token 至 Kiro IDE，支持 Windows / macOS / Linux

---

## 📦 安装指南

### 方式一：从源码安装（推荐）

1️⃣ **克隆仓库**
```bash
git clone https://git.specialz.org/Specialz/aws-auto-reg-for-ex.git
cd aws-auto-reg-for-ex/extension
```

2️⃣ **加载扩展**
- 打开 Chrome 浏览器
- 访问 `chrome://extensions/`
- 开启右上角「开发者模式」
- 点击「加载已解压的扩展程序」
- 选择 `extension` 目录

3️⃣ **启用无痕模式**
- 在扩展卡片上，点击「详细信息」
- 找到「在无痕模式下启用」，**必须开启**
- 刷新扩展（点击刷新图标 🔄）

### 方式二：安装打包文件

1. 下载 [extension.crx](../../releases) 或 `extension.zip`
2. 解压后按照「方式一」的步骤 2-3 加载

---

## 📖 使用说明

### 快速开始

1. **点击扩展图标** 打开弹窗
2. **设置参数**
   - 注册数量：1-100（建议 ≤ 10）
   - 并发窗口：1-3（建议 ≤ 2）
3. **点击「开始注册」**
4. **等待完成**，查看注册结果

### 功能详解

#### 🔢 批量注册

```
注册数量：要注册的账号总数（1-100）
并发窗口：同时运行的无痕窗口数（1-3）

⚠️ 注意：
- 🚨 并发多窗口功能目前不稳定，强烈建议设置为 1
- 并发越高速度越快，但过多窗口可能导致加载异常
- 建议并发 ≤ 2，避免触发 API 限流
```

#### ✅ Token 验证

注册完成后，点击「验证」按钮批量检测所有 Token 状态：

| 状态 | 含义 | 颜色 |
|------|------|------|
| **有效** | Token 正常可用 | 🟢 绿色 |
| **封禁** | 账号被临时封禁 | 🟡 黄色 |
| **过期** | Token 已过期 | 🟠 橙色 |
| **无效** | 账号无效或被删除 | 🔴 红色 |
| **错误** | 网络或服务器错误 | ⚫ 灰色 |
| **未验证** | 尚未验证 | ⚪ 浅灰 |

#### 📊 导出账号

- **JSON 导出**：仅导出有效和未验证的 Token（自动过滤封禁/过期/无效）
- **CSV 导出**：导出完整信息，包含 `token_status` 列

#### 📋 复制记录

点击历史记录中的「复制」按钮，一键复制账号信息：
```
邮箱: xxx@mailfly.top
密码: ************
姓名: John Doe
Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### 🚀 同步至 Kiro IDE

一键将 Token 同步至 Kiro IDE，**智能检测操作系统**，自动生成对应命令。

**支持的系统：**

| 系统 | 终端 | 配置文件路径 |
|------|------|-------------|
| Windows | PowerShell | `%USERPROFILE%\.aws\sso\cache\` |
| macOS | Terminal | `~/.aws/sso/cache/` |
| Linux | Terminal | `~/.aws/sso/cache/` |

**使用步骤：**

1. 在历史记录中找到成功注册且有 Token 的记录
2. 点击该记录旁边的 **「Kiro」** 按钮
3. 插件会自动检测你的操作系统，生成对应的命令并复制到剪贴板
4. 打开对应的终端（Windows 用 PowerShell，macOS/Linux 用 Terminal）
5. 粘贴并执行命令
6. 重启 Kiro IDE 即可使用同步的账号

**生成的配置文件：**

```
~/.aws/sso/cache/
├── kiro-auth-token.json    # 认证 Token（accessToken, refreshToken 等）
└── <clientIdHash>.json     # 客户端凭证（clientId, clientSecret）
```

---

## 🏗️ 技术架构

### 技术栈

<div align="center">

| 层级 | 技术 | 说明 |
|:----:|:----:|:-----|
| **核心** | ![Manifest V3](https://img.shields.io/badge/Manifest-V3-4285F4?logo=googlechrome) | Chrome Extension API |
| **语言** | ![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black) | ES6+ Modules |
| **UI** | ![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white) | 原生 HTML/CSS |
| **API** | ![Fetch API](https://img.shields.io/badge/Fetch-API-green) | RESTful API 调用 |
| **认证** | ![OAuth 2.0](https://img.shields.io/badge/OAuth-2.0-blue?logo=oauth) | AWS OIDC Device Flow |

</div>

### 项目结构

```
extension/
├── manifest.json              # 扩展配置（Manifest V3）
├── background/
│   └── service-worker.js     # 后台服务（会话管理、API 调用）
├── content/
│   └── content.js            # 内容脚本（页面自动化）
├── popup/
│   ├── popup.html            # 弹窗界面
│   ├── popup.css             # 弹窗样式
│   └── popup.js              # 弹窗逻辑
├── lib/
│   ├── mail-api.js           # MailFly 临时邮箱 API
│   ├── oidc-api.js           # AWS OIDC 认证 API + Token 验证
│   └── utils.js              # 工具函数（密码/姓名生成）
└── icons/
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

### 核心流程

```mermaid
graph TD
    A[用户点击开始] --> B[创建会话]
    B --> C[创建临时邮箱]
    C --> D[获取 OIDC 授权链接]
    D --> E[打开无痕窗口]
    E --> F[Content Script 自动填表]
    F --> G[Service Worker 轮询 Token]
    G --> H{Token 获取成功?}
    H -->|是| I[保存账号信息]
    H -->|否| J[记录失败]
    I --> K[验证 Token 状态]
    K --> L[导出结果]
```

---

## ⚠️ 注意事项

- ✅ **必须启用无痕模式权限**，否则无法创建无痕窗口
- ⚠️ 建议并发窗口 ≤ 2，避免触发 AWS API 限流
- ⚠️ Token 默认状态为「未验证」，需手动点击「验证」按钮
- ⚠️ 临时邮箱依赖 MailFly 服务，服务不可用时会注册失败
- 📱 仅支持 Chrome 浏览器（基于 Manifest V3）

---

## 🐛 常见问题

<details>
<summary><b>❓ 提示"创建无痕窗口失败"</b></summary>

**原因**：未启用无痕模式权限

**解决方案**：
1. 访问 `chrome://extensions/`
2. 找到本扩展，点击「详细信息」
3. 开启「在无痕模式下启用」
4. 刷新扩展（点击刷新图标 🔄）
</details>

<details>
<summary><b>❓ 页面加载超时或卡住</b></summary>

**原因**：并发窗口过多或网络不稳定

**解决方案**：
1. 减少并发窗口数（设为 1-2）
2. 检查网络连接
3. 刷新扩展重试
</details>

<details>
<summary><b>❓ Token 显示「未验证」</b></summary>

**原因**：默认不会自动验证 Token

**解决方案**：
点击「验证」按钮批量验证所有 Token 状态
</details>

<details>
<summary><b>❓ 导出的 JSON 文件为空</b></summary>

**原因**：所有 Token 都被过滤了（封禁/过期/无效）

**解决方案**：
1. 点击「验证」按钮检查 Token 状态
2. 如需导出全部，使用「CSV」导出（包含所有状态）
</details>

<details>
<summary><b>❓ Kiro 同步后 IDE 仍提示未登录</b></summary>

**原因**：配置文件未正确写入或 Kiro 未重启

**解决方案**：
1. 确认在正确的终端中执行命令（Windows 用 PowerShell，macOS/Linux 用 Terminal）
2. 检查 `~/.aws/sso/cache/` 目录（Windows: `%USERPROFILE%\.aws\sso\cache\`）是否存在配置文件
3. 完全退出并重启 Kiro IDE
4. 如果仍有问题，尝试删除旧的配置文件后重新同步
</details>

<details>
<summary><b>❓ Windows 执行命令报错</b></summary>

**原因**：可能使用了 CMD 而非 PowerShell

**解决方案**：
1. 确保使用 **PowerShell** 执行命令（不是 CMD）
2. 右键点击开始菜单，选择「Windows PowerShell」或「终端」
3. 粘贴命令并按回车执行
</details>

---

## 📄 License

本项目基于 [MIT License](LICENSE) 开源。

---

<div align="center">

**⭐ 如果这个项目对你有帮助，请给一个 Star！**

Made with ❤️ by [Specialz](https://git.specialz.org/Specialz)

</div>
