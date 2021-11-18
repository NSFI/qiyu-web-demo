
import React, { Component } from 'react';
import { configUsr } from './config';

import './Main.less';
export default class Main extends Component {
    componentDidMount() {
        // 上报用户信息
        configUsr();
    }

    render() {
        return (
            <div className="m-main">
                <p className="tlt">
                    <img className="u-img" src="https://ysf.qiyukf.net/operation/1d618cc5046ea502010253397c79e675" /> 网易七鱼访客端-web接入demo
                </p>
                <section className="sec">
                    <img className="u-banner" src="https://ysf.nosdn.127.net/48a8eec4fd8bdb4c740a55ff55c2258d" />
                </section>
                <section className="sec">
                    <p className="tlt">常见问题小课堂</p>
                    <div className="info"><span className="label">SDK 引入时机: </span>我们建议在工程入口处初始化 SDK</div>
                    <div className="info"><span className="label">config 上报时机: </span>访客登录成功后，获取必要用户信息并调用 ysf.config 上报</div>
                    <div className="info"><span className="label">用户退出: </span> 为保证用户信息正确上传，用户退出时请调用 ysf.logoff</div>
                    <div className="info"><span className="label">ysf.url: </span>{"若使用 ysf.url 获取访客端地址，管理端 > 访客端设置 请选择非浮层样式"}</div>
                </section>
            </div>
        );
    }
}