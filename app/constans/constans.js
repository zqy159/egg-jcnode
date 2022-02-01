

module.exports = {
  basicDramaChapterEnum: () => {
    return {
      1: '故事背景',
      2: '前言',
      3: '问题&结局',
      4: '复盘&真相',
      5: '规则说明',
      6: '作者阐述',
      7: '附件',
    };
  },
  defaultRole: () => {
    return [
      {
        dramaRoleName: '角色一',
        sex: 1,
        age: 20,
        roleType: 0,
        desc: '描述...............',
      },
      {
        dramaRoleName: '角色二',
        sex: 1,
        age: 20,
        roleType: 0,
        desc: '描述...............',
      },
      {
        dramaRoleName: '角色三',
        sex: 2,
        age: 20,
        roleType: 0,
        desc: '描述...............',
      },

    ];
  },
  coverPage: data => {

    const { dramaName, nickname, roleNum, themeTag, dramaTypeTag } = data;
    const htmllet = `
    <div style="padding:56px 64px;text-align:center;">
        <div style="font-size:32px;color: #21232A;font-weight:bold;margin-top:80px">${dramaName}</div>
        <div style="font-size:24px;margin:24px 0 390px 0;color:#21232A ">作者：${nickname}</div>
        <div>
          <p>玩家人数：${roleNum}</p>
          <p>剧本题材：${themeTag}</p>
          <p>剧本类型：${dramaTypeTag}</p>
        </div>
        <div style="font-size:16px;color:#416AFF;margin-bottom:16px">非正式作品，请勿传阅</div>
        <div style="font-size:14px;color:#ADB0BD">剧创意 www.juchuangyi.com</div>
      </div>
    `;
    return htmllet;
  },
  cataloguePage: data => {
    const { basicChapterList, roleList } = data;
    let chapterStr = '';
    let roleStr = '';
    basicChapterList.forEach((item, index) => {
      chapterStr += `<p>${index + 1 + '. ' + item.basicDramaChapterName}</p>`;
    });
    roleList.forEach((item, index) => {
      roleStr += `<p>${basicChapterList.length + 2 + '.' + (index + 1) + ' ' + item.dramaRoleName}</p>`;
    });
    const htmllet = `
    <div style="padding:56px 64px">
        <div style="font-size:24px;color: #21232A;margin-bottom:24px">目录</div>
        <div style="font-size:14px;line-height:30px">
          ${chapterStr}
          <p>${basicChapterList.length + 1}. 章节设计</p>
          <p>${basicChapterList.length + 2}. 人物剧本</p>
            <div style="padding-left:24px">
              ${roleStr}
            </div>
          <p>${basicChapterList.length + 3}. 时间线</p>
          <p>${basicChapterList.length + 4}. 素材</p>
         
        
        </div>
      </div>
    `;
    return htmllet;
  },
  chapterDesign: data => {
    const { dramaChapterList } = data;
    let chapterStr = '';
    dramaChapterList.forEach((item, index) => {
      let chapterChildrenStr = '';
      if (item.children) {
        item.children.forEach((ites, i) => {
          chapterChildrenStr += `<p>${index + 1 + '.' + (i + 1) + ' ' + ites.dramaChapterName}</p>`;
        });
      }
      chapterStr += `<div style="font-size:18px;margin:16px 0">${item.dramaChapterName}</div><div style="margin-left:24px;color: #6C707D;">${chapterChildrenStr}</div>`;
    });
    const htmllet = `
    <div style="padding:56px 64px">
        <div style="font-size:24px;color: #21232A;margin-bottom:24px">章节设计</div>
        <div style="font-size:14px;line-height:30px">
          ${chapterStr}
        
        </div>
      </div>
    `;
    return htmllet;
  },
  getTimeLineHtml: data => {
    const { timeLineData } = data;
    let timeLineStr = '';
    function recursiveData(list, isChidren) {
      list.forEach(item => {
        timeLineStr += `<div style="${isChidren && 'margin-left:30px'}"><p style="font-size: 18px;margin-right:15px;">${item.dramaChapterName}</p>`;
        item.infoData.forEach(ites => {
          if (ites.eventName) {
            timeLineStr += `<div>
    <p style="font-size: 18px;margin-right:15px;">${ites.timeType === '2' ? ites.inventTime : ites.adTime}     ${ites.eventName}</p>
    <div style="border-bottom:2px solid #DEE0E6;padding:12px 0;margin:12px 0;font-size: 14px;color: #6C707D;">${ites.desc}</div>
    </div>`;
          }
        });
        timeLineStr += '</div>';
        if (item.children) {
          recursiveData(item.children, true);
        }

      });

    }
    recursiveData(timeLineData);
    const htmllet = `
    <div style="padding:56px 64px">
        <div style="font-size:24px;color: #21232A;margin-bottom:24px">时间线</div>
        <div style="font-size:14px">
          ${timeLineStr}
        </div>
      </div>
    `;
    return htmllet;
  },
  getRoleHtml: data => {
    const { role, chapterContentData } = data;
    let roleDramaStr = '';
    function recursiveData(list, isChidren) {
      list.forEach(item => {
        roleDramaStr += `<div style="${isChidren && 'margin-left:30px'}">
        <p style="font-size: 18px;margin-right:15px;">${item.dramaChapterName}</p>
        <div style="border-bottom:2px solid #DEE0E6;padding:12px 0;margin:12px 0;font-size: 14px;color: #6C707D;">${item.content}</div>
        </div>`;
        if (item.children) {
          recursiveData(item.children, true);
        }
      });
    }
    recursiveData(chapterContentData);
    const htmllet = `
    <div style="padding:56px 64px">
        <div style="font-size:24px;color: #21232A;margin-bottom:24px">人物剧本</div>
          <p><span style="font-size: 18px;margin-right:15px;">${role.dramaRoleName}</span>  <span>${role.sex === 1 ? '男' : '女'}</span> , <span>${role.age}岁</span></p >
          <div style="border-bottom:2px solid #DEE0E6;padding:12px 0;margin:12px 0;font-size: 14px;color: #6C707D;">${role.desc}</div>
  
        <div style="font-size:14px">
          ${roleDramaStr}
        </div>
      </div >
  `;
    return htmllet;
  },
  getMaterialHtml: data => {
    const { materialData } = data;
    let materialStr = '';
    function recursiveData(list, isChidren) {
      list.forEach(item => {
        materialStr += `<div style = "${isChidren && 'margin-left:30px'}" > <p style="font-size: 18px;margin-right:15px;">${item.dramaChapterName} </p>`;
        item.infoData.forEach(ites => {
          if (ites.dramaMaterialName) {
            materialStr += `
  <div style = "border-bottom:2px solid #DEE0E6;padding:12px 0;margin:12px 0;font-size: 14px;color: #6C707D;"> ${ites.dramaMaterialName}
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="${ites.dramaMaterialUrl}">下载</a>
               </div >
  `;
          }
        });
        materialStr += '</div>';
        if (item.children) {
          recursiveData(item.children, true);
        }
      });
    }
    recursiveData(materialData);
    const htmllet = `
  <div style = "padding:56px 64px" >
      <div style="font-size:24px;color: #21232A;margin-bottom:24px">素材</div>
      <div style="font-size:14px">
        ${materialStr}
      </div>
    </div>
  `;
    return htmllet;
  },

};

