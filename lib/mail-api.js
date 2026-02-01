/**
 * 临时邮箱 API 封装
 * 支持自定义前缀和域名
 */

const MAIL_BASE_URL = 'https://mailfly.codeforge.top';
const DEFAULT_DOMAIN = 'specialz.org';

/**
 * 生成随机前缀
 * @param {number} length - 前缀长度
 * @returns {string} 随机前缀
 */
function generateRandomPrefix(length = 8) {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let prefix = '';
  // 确保首字符是字母
  prefix += chars.charAt(Math.floor(Math.random() * 26));
  for (let i = 1; i < length; i++) {
    prefix += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return prefix;
}

/**
 * 临时邮箱客户端
 */
class MailClient {
  /**
   * @param {Object} options - 配置选项
   * @param {string} [options.baseUrl] - API 基础 URL
   * @param {string} [options.domain] - 邮箱域名
   */
  constructor(options = {}) {
    this.baseUrl = options.baseUrl || MAIL_BASE_URL;
    this.domain = options.domain || DEFAULT_DOMAIN;
    this.address = null;
    this.accessKey = null;
    this.expiresAt = null;
  }

  /**
   * 创建新邮箱
   * @param {Object} options - 创建选项
   * @param {string} [options.prefix] - 自定义前缀（不提供则随机生成）
   * @param {string} [options.domain] - 自定义域名（覆盖构造函数中的域名）
   * @returns {Promise<string>} 邮箱地址
   */
  async createInbox(options = {}) {
    const prefix = options.prefix || generateRandomPrefix(10);
    const domain = options.domain || this.domain;

    const response = await fetch(`${this.baseUrl}/api/inbox`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prefix: prefix,
        domain: domain
      })
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => '');
      throw new Error(`创建邮箱失败: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    this.address = data.address;
    this.accessKey = data.access_key;
    this.expiresAt = data.expires_at;
    return this.address;
  }

  /**
   * 获取邮箱邮件列表
   * @returns {Promise<Array>} 邮件列表
   */
  async getMailList() {
    if (!this.address || !this.accessKey) {
      throw new Error('邮箱未创建');
    }

    const url = new URL(`${this.baseUrl}/api/inbox/${this.address}`);
    url.searchParams.set('key', this.accessKey);

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`获取邮件列表失败: ${response.status}`);
    }

    const data = await response.json();

    // 兼容多种返回格式
    if (Array.isArray(data)) {
      return data;
    }
    return data.emails || data.data || data.messages || [];
  }

  /**
   * 获取邮件内容（含自动提取的验证码）
   * @param {string} mailId - 邮件ID
   * @returns {Promise<Object>} 邮件内容
   */
  async getMail(mailId) {
    if (!this.accessKey) {
      throw new Error('邮箱未创建');
    }

    const url = new URL(`${this.baseUrl}/api/mail/${mailId}`);
    url.searchParams.set('key', this.accessKey);

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`获取邮件内容失败: ${response.status}`);
    }

    return await response.json();
  }

  /**
   * 轮询等待验证码邮件
   * @param {number} timeout - 超时时间（毫秒），默认120000
   * @param {number} pollInterval - 轮询间隔（毫秒），默认3000
   * @returns {Promise<string>} 验证码字符串
   */
  async waitForVerificationCode(timeout = 120000, pollInterval = 3000) {
    const startTime = Date.now();

    while (Date.now() - startTime < timeout) {
      try {
        const mailList = await this.getMailList();
        console.log('[Mail API] 邮件列表:', mailList);

        if (mailList && mailList.length > 0) {
          // 取最新一封邮件
          const latest = mailList[0];
          const mailId = latest.id || latest._id;
          console.log('[Mail API] 邮件 ID:', mailId);

          if (mailId) {
            const mailDetail = await this.getMail(String(mailId));
            console.log('[Mail API] 邮件详情:', mailDetail);

            const code = mailDetail.code;
            if (code) {
              return String(code);
            }
          }
        }
      } catch (e) {
        console.error('[Mail API] 轮询出错:', e);
      }

      await new Promise(resolve => setTimeout(resolve, pollInterval));
    }

    throw new Error(`等待验证码超时（${timeout / 1000}s）`);
  }

  /**
   * 删除邮箱
   */
  async deleteInbox() {
    if (!this.address || !this.accessKey) {
      return;
    }

    try {
      await fetch(`${this.baseUrl}/api/inbox/${this.address}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ key: this.accessKey })
      });
    } catch (e) {
      // 忽略删除结果
      console.log('[Mail API] 删除邮箱结果:', e);
    }
  }

  /**
   * 获取当前邮箱信息
   * @returns {{address: string, accessKey: string}}
   */
  getInfo() {
    return {
      address: this.address,
      accessKey: this.accessKey
    };
  }
}

export { MailClient, MAIL_BASE_URL, DEFAULT_DOMAIN, generateRandomPrefix };
