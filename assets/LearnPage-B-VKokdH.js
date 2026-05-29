import{a as e,i as t,n,t as r}from"./index-BmDBiMdA.js";var i=e(t(),1),a={container:`_container_1xuuz_1`,progressBar:`_progressBar_1xuuz_13`,progressStep:`_progressStep_1xuuz_25`,stepDot:`_stepDot_1xuuz_31`,stepDone:`_stepDone_1xuuz_47`,stepCurrent:`_stepCurrent_1xuuz_54`,pulseGlow:`_pulseGlow_1xuuz_1`,stepLabel:`_stepLabel_1xuuz_67`,stepLabelActive:`_stepLabelActive_1xuuz_77`,stepLine:`_stepLine_1xuuz_81`,stepLineDone:`_stepLineDone_1xuuz_90`,statusBar:`_statusBar_1xuuz_95`,statusBadge:`_statusBadge_1xuuz_103`,statusTopic:`_statusTopic_1xuuz_114`,statusStat:`_statusStat_1xuuz_124`,content:`_content_1xuuz_136`,fadeIn:`_fadeIn_1xuuz_140`,fadeSlideUp:`_fadeSlideUp_1xuuz_1`,phaseTitle:`_phaseTitle_1xuuz_149`,phaseSubtitle:`_phaseSubtitle_1xuuz_159`,topicGrid:`_topicGrid_1xuuz_166`,topicCard:`_topicCard_1xuuz_173`,topicCardDone:`_topicCardDone_1xuuz_207`,topicCardIcon:`_topicCardIcon_1xuuz_217`,topicCardName:`_topicCardName_1xuuz_223`,topicCardBadge:`_topicCardBadge_1xuuz_229`,overallProgress:`_overallProgress_1xuuz_241`,progressLabel:`_progressLabel_1xuuz_248`,progressTrack:`_progressTrack_1xuuz_257`,progressFill:`_progressFill_1xuuz_264`,topicTag:`_topicTag_1xuuz_272`,explanationCard:`_explanationCard_1xuuz_282`,quizHeader:`_quizHeader_1xuuz_300`,quizCounter:`_quizCounter_1xuuz_307`,quizDifficulty:`_quizDifficulty_1xuuz_316`,quizQuestion:`_quizQuestion_1xuuz_321`,optionsGrid:`_optionsGrid_1xuuz_334`,optionCard:`_optionCard_1xuuz_341`,optionLetter:`_optionLetter_1xuuz_362`,optionSelected:`_optionSelected_1xuuz_378`,optionCorrect:`_optionCorrect_1xuuz_389`,correctPop:`_correctPop_1xuuz_1`,optionWrong:`_optionWrong_1xuuz_401`,shake:`_shake_1xuuz_1`,optionMark:`_optionMark_1xuuz_413`,feedbackCard:`_feedbackCard_1xuuz_434`,feedbackCorrectCard:`_feedbackCorrectCard_1xuuz_443`,feedbackWrongCard:`_feedbackWrongCard_1xuuz_448`,feedbackIcon:`_feedbackIcon_1xuuz_453`,feedbackTitle:`_feedbackTitle_1xuuz_459`,feedbackAnswer:`_feedbackAnswer_1xuuz_473`,feedbackExplanation:`_feedbackExplanation_1xuuz_483`,masterySection:`_masterySection_1xuuz_494`,masteryLabel:`_masteryLabel_1xuuz_498`,masteryValue:`_masteryValue_1xuuz_507`,masteryTrack:`_masteryTrack_1xuuz_511`,masteryFill:`_masteryFill_1xuuz_519`,shimmer:`_shimmer_1xuuz_1`,masteryComplete:`_masteryComplete_1xuuz_540`,errorList:`_errorList_1xuuz_550`,errorItem:`_errorItem_1xuuz_557`,errorItemHeader:`_errorItemHeader_1xuuz_566`,errorItemType:`_errorItemType_1xuuz_573`,errorItemTime:`_errorItemTime_1xuuz_582`,errorItemDesc:`_errorItemDesc_1xuuz_587`,errorItemHint:`_errorItemHint_1xuuz_594`,actions:`_actions_1xuuz_604`,btnPrimary:`_btnPrimary_1xuuz_611`,btnGhost:`_btnGhost_1xuuz_633`,btnPulse:`_btnPulse_1xuuz_651`},o=r(),s=[{id:`q1`,topic:`array`,question:`数组随机访问的时间复杂度是？`,options:[`O(1)`,`O(n)`,`O(logn)`,`O(n²)`],correctIndex:0,explanation:`数组通过基地址+偏移量直接计算地址，无需遍历，因此是O(1)`,difficulty:1},{id:`q2`,topic:`array`,question:`在数组中间插入一个元素的时间复杂度是？`,options:[`O(1)`,`O(n)`,`O(logn)`,`O(n²)`],correctIndex:1,explanation:`插入后需要移动插入位置后的所有元素，平均移动n/2个，因此是O(n)`,difficulty:1},{id:`q3`,topic:`linked-list`,question:`链表相比数组的主要优势是？`,options:[`随机访问更快`,`插入删除更高效`,`占用空间更少`,`缓存友好性更好`],correctIndex:1,explanation:`链表插入删除只需修改指针O(1)，而数组需要移动元素O(n)`,difficulty:1},{id:`q4`,topic:`stack`,question:`栈的存取原则是？`,options:[`先进先出`,`后进先出`,`随机存取`,`优先级存取`],correctIndex:1,explanation:`栈是LIFO(Last In First Out)结构，最后入栈的元素最先出栈`,difficulty:1,errorType:`understanding`},{id:`q5`,topic:`queue`,question:`BFS遍历图时使用的数据结构是？`,options:[`栈`,`队列`,`优先队列`,`双端队列`],correctIndex:1,explanation:`BFS逐层扩展，需要队列保证先发现的节点先被处理(FIFO)`,difficulty:2,errorType:`method`},{id:`q6`,topic:`tree`,question:`二叉搜索树的中序遍历结果是什么？`,options:[`随机序列`,`降序序列`,`升序序列`,`原插入序列`],correctIndex:2,explanation:`BST的性质：左<根<右，中序遍历(左根右)恰好得到升序序列`,difficulty:2,errorType:`understanding`},{id:`q7`,topic:`hash`,question:`哈希表平均查找时间复杂度是？`,options:[`O(1)`,`O(n)`,`O(logn)`,`O(n²)`],correctIndex:0,explanation:`理想情况下哈希函数直接定位，平均O(1)。最坏情况(全冲突)退化为O(n)`,difficulty:1},{id:`q8`,topic:`sort`,question:`以下哪个排序算法是稳定的？`,options:[`快速排序`,`选择排序`,`归并排序`,`堆排序`],correctIndex:2,explanation:`归并排序合并时相等元素保持原顺序，因此稳定。快排和选择排序可能改变相等元素的相对位置`,difficulty:2,errorType:`understanding`},{id:`q9`,topic:`graph`,question:`DFS遍历图时使用的数据结构是？`,options:[`队列`,`栈`,`数组`,`哈希表`],correctIndex:1,explanation:`DFS深度优先，后发现的节点先处理，因此用栈(或递归调用栈)`,difficulty:2,errorType:`method`},{id:`q10`,topic:`sort`,question:`快速排序最坏情况的时间复杂度是？`,options:[`O(nlogn)`,`O(n)`,`O(n²)`,`O(logn)`],correctIndex:2,explanation:`当每次选择的基准值都是最大或最小值时(如已排序数组选首元素)，分区极度不平衡，退化为O(n²)`,difficulty:2,errorType:`calculation`},{id:`q11`,topic:`array`,question:`二分查找的前提条件是？`,options:[`数组有序`,`数组无序`,`数组长度为奇数`,`数组元素唯一`],correctIndex:0,explanation:`二分查找依赖有序性，通过比较中间元素排除一半搜索范围`,difficulty:1},{id:`q12`,topic:`linked-list`,question:`单向链表删除节点需要知道什么？`,options:[`被删节点的前驱`,`被删节点的后继`,`头节点`,`尾节点`],correctIndex:0,explanation:`删除节点需要修改前驱节点的next指针，跳过被删节点`,difficulty:2,errorType:`method`},{id:`q13`,topic:`tree`,question:`满二叉树第i层最多有多少个节点？`,options:[`i`,`2^i`,`2^(i-1)`,`i²`],correctIndex:2,explanation:`满二叉树第i层最多有2^(i-1)个节点（根为第1层）`,difficulty:2,errorType:`calculation`},{id:`q14`,topic:`graph`,question:`无向图有n个顶点，最多有多少条边？`,options:[`n`,`n-1`,`n(n-1)/2`,`n(n-1)`],correctIndex:2,explanation:`完全无向图中每对顶点之间有一条边，C(n,2)=n(n-1)/2`,difficulty:2,errorType:`calculation`},{id:`q15`,topic:`hash`,question:`哈希冲突是指？`,options:[`哈希表满了`,`两个不同键映射到同一位置`,`哈希函数计算错误`,`键值重复`],correctIndex:1,explanation:`哈希冲突指不同的键经过哈希函数计算后得到相同的索引位置`,difficulty:1,errorType:`understanding`}],c={input:{label:`选择`,icon:`📝`,desc:`选择学习主题`,color:`#3b82f6`},explain:{label:`讲解`,icon:`📖`,desc:`学习核心概念`,color:`#8b5cf6`},attempt:{label:`练习`,icon:`🎯`,desc:`检验学习成果`,color:`#f59e0b`},feedback:{label:`反馈`,icon:`💬`,desc:`分析答题情况`,color:`#10b981`},reinforce:{label:`强化`,icon:`💪`,desc:`针对薄弱点训练`,color:`#ef4444`}},l=[`input`,`explain`,`attempt`,`feedback`,`reinforce`],u={array:`📖 **数组核心概念**

数组是最基础的线性数据结构，元素在内存中连续存储。

**核心公式**：addr[i] = base + i × elementSize

**关键操作复杂度**：
• 访问：O(1) — 直接计算地址
• 插入：O(n) — 需要移动元素
• 删除：O(n) — 需要移动元素
• 查找：O(n)线性 / O(logn)二分

**适用场景**：读多写少、需要随机访问`,linkedList:`📖 **链表核心概念**

链表通过指针将节点串联，不需要连续内存。

**节点结构**：data + next指针

**关键操作复杂度**：
• 头插：O(1)
• 查找：O(n) — 必须从头遍历
• 中间插入：O(n)查找 + O(1)插入

**与数组对比**：链表插入删除快，但查找慢`,stack:`📖 **栈核心概念**

栈是后进先出(LIFO)的线性结构。

**核心操作**：Push(入栈)、Pop(出栈)、Peek(查看栈顶)

**关键应用**：
• 函数调用栈
• 括号匹配
• 表达式求值
• 浏览器前进后退

**核心原则**：最后放进去的最先出来`,queue:`📖 **队列核心概念**

队列是先进先出(FIFO)的线性结构。

**核心操作**：Enqueue(入队)、Dequeue(出队)

**关键应用**：
• BFS广度优先搜索
• 任务调度(FCFS)
• 消息队列

**循环队列**：rear = (rear+1) % capacity`,tree:`📖 **二叉树核心概念**

二叉树每个节点最多两个子节点。

**三种遍历**：
• 前序：根→左→右
• 中序：左→根→右（BST=升序）
• 后序：左→右→根

**BST性质**：左<根<右
**操作复杂度**：平均O(logn)，最坏O(n)`,graph:`📖 **图核心概念**

图由顶点和边组成，是最通用的数据结构。

**两种遍历**：
• BFS：队列，逐层扩展，求最短路径
• DFS：栈/递归，深入到底，路径搜索

**关键**：必须维护visited集合防止重复访问`,hash:`📖 **哈希表核心概念**

哈希表通过哈希函数将键映射到数组索引。

**平均复杂度**：O(1)查找
**最坏情况**：O(n)（全冲突）

**冲突解决**：
• 线性探测：简单但易聚集
• 链地址法：最常用

**负载因子**：α = n/m，>0.7应扩容`,sort:`📖 **排序算法核心概念**

**O(n²)排序**：冒泡、选择、插入 — 简单，适合小数据
**O(nlogn)排序**：快排、归并 — 高效，适合大数据

**稳定性**：相等元素排序后相对位置不变
• 稳定：冒泡、插入、归并
• 不稳定：选择、快排、堆排

**选择建议**：一般用快排，需要稳定用归并`};function d(){let[e,t]=(0,i.useState)({phase:`input`,currentTopic:``,attempts:0,correctCount:0,errors:[],mastery:0}),[n,r]=(0,i.useState)(-1),[d,f]=(0,i.useState)(!1),[p,m]=(0,i.useState)(null),[h,g]=(0,i.useState)(``),[_,v]=(0,i.useState)([]),[y,b]=(0,i.useState)(new Set),[x,S]=(0,i.useState)(0),C=[`array`,`linked-list`,`stack`,`queue`,`tree`,`graph`,`hash`,`sort`],w={array:`数组`,"linked-list":`链表`,stack:`栈`,queue:`队列`,tree:`树`,graph:`图`,hash:`哈希表`,sort:`排序算法`},T={array:`📊`,"linked-list":`🔗`,stack:`📚`,queue:`🚶`,tree:`🌳`,graph:`🕸️`,hash:`#️⃣`,sort:`📈`},E=(0,i.useCallback)(e=>{let n=e===`linked-list`?`linkedList`:e===`hash-table`?`hash`:e;t(t=>({...t,phase:`explain`,currentTopic:e,attempts:0,correctCount:0,errors:[],mastery:0})),g(u[n]||`概念讲解中...`),b(new Set),S(e=>e+1)},[]),D=(0,i.useCallback)((e,t)=>{let n=s.filter(n=>n.topic===e&&!t.has(n.id));if(n.length>0)return n[Math.floor(Math.random()*n.length)];let r=s.filter(e=>!t.has(e.id));if(r.length>0)return r[Math.floor(Math.random()*r.length)];b(new Set);let i=s.filter(t=>t.topic===e);return i.length>0?i[Math.floor(Math.random()*i.length)]:s[Math.floor(Math.random()*s.length)]},[]),O=(0,i.useCallback)(()=>{let n=D(e.currentTopic,y);m(n),b(e=>new Set(e).add(n.id)),t(e=>({...e,phase:`attempt`,attempts:e.attempts+1})),r(-1),f(!1),S(e=>e+1)},[e.currentTopic,y,D]),k=(0,i.useCallback)(()=>{if(!(!p||n===-1))if(f(!0),n===p.correctIndex)t(e=>({...e,phase:`feedback`,correctCount:e.correctCount+1,mastery:Math.min(100,e.mastery+20)}));else{let e={type:p.errorType||(Math.abs(n-p.correctIndex)===1?`calculation`:`understanding`),description:`「${p.question}」选择了「${p.options[n]}」，正确答案是「${p.options[p.correctIndex]}」`,timestamp:Date.now(),topic:p.topic,hint:p.explanation};t(t=>({...t,phase:`feedback`,errors:[...t.errors,e],mastery:Math.max(0,t.mastery-15)}))}},[p,n]),A=(0,i.useCallback)(()=>{let n=D(e.currentTopic,y);m(n),b(e=>new Set(e).add(n.id)),t(e=>({...e,phase:`attempt`,attempts:e.attempts+1})),r(-1),f(!1),S(e=>e+1)},[e.currentTopic,y,D]),j=(0,i.useCallback)(()=>{v(t=>[...new Set([...t,e.currentTopic])]),t({phase:`input`,currentTopic:``,attempts:0,correctCount:0,errors:[],mastery:0}),m(null),b(new Set),S(e=>e+1)},[e.currentTopic]),M=(0,i.useCallback)(()=>{t(e=>({...e,phase:`attempt`})),A()},[A]),N=(0,i.useMemo)(()=>e.attempts===0?0:Math.round(e.correctCount/e.attempts*100),[e.attempts,e.correctCount]),P=l.indexOf(e.phase),F=e=>e.split(`
`).map((e,t)=>{let n=e,r=[],i=0,a=/\*\*(.+?)\*\*/g,s;for(;(s=a.exec(e))!==null;)s.index>i&&r.push(e.slice(i,s.index)),r.push((0,o.jsx)(`strong`,{children:s[1]},t+`-`+s.index)),i=s.index+s[0].length;return r.length>0&&(i<e.length&&r.push(e.slice(i)),n=r),(0,o.jsx)(`div`,{style:{marginBottom:e.startsWith(`•`)?2:0,paddingLeft:e.startsWith(`•`)?8:0},children:n},t)});return(0,o.jsxs)(`div`,{className:a.container,children:[(0,o.jsx)(`div`,{className:a.progressBar,children:l.map((e,t)=>(0,o.jsxs)(`div`,{className:a.progressStep,children:[(0,o.jsx)(`div`,{className:`${a.stepDot} ${t<P?a.stepDone:``} ${t===P?a.stepCurrent:``}`,style:{"--step-color":c[e].color},children:t<P?`✓`:c[e].icon}),(0,o.jsx)(`span`,{className:`${a.stepLabel} ${t<=P?a.stepLabelActive:``}`,children:c[e].label}),t<l.length-1&&(0,o.jsx)(`div`,{className:`${a.stepLine} ${t<P?a.stepLineDone:``}`})]},e))}),(0,o.jsxs)(`div`,{className:a.statusBar,children:[(0,o.jsxs)(`span`,{className:a.statusBadge,style:{background:c[e.phase].color+`20`,color:c[e.phase].color,borderColor:c[e.phase].color+`40`},children:[c[e.phase].icon,` `,c[e.phase].desc]}),e.currentTopic&&(0,o.jsxs)(`span`,{className:a.statusTopic,children:[T[e.currentTopic],` `,w[e.currentTopic]]}),e.attempts>0&&(0,o.jsxs)(`span`,{className:a.statusStat,children:[`✅ `,e.correctCount,`/`,e.attempts,` 正确率 `,N,`%`]})]}),(0,o.jsxs)(`div`,{className:a.content,children:[e.phase===`input`&&(0,o.jsxs)(`div`,{className:a.fadeIn,children:[(0,o.jsx)(`h3`,{className:a.phaseTitle,children:`选择学习主题`}),(0,o.jsx)(`p`,{className:a.phaseSubtitle,children:`选择一个数据结构或算法主题开始学习`}),(0,o.jsx)(`div`,{className:a.topicGrid,children:C.map(e=>(0,o.jsxs)(`button`,{className:`${a.topicCard} ${_.includes(e)?a.topicCardDone:``}`,onClick:()=>E(e),children:[(0,o.jsx)(`span`,{className:a.topicCardIcon,children:T[e]}),(0,o.jsx)(`span`,{className:a.topicCardName,children:w[e]}),_.includes(e)&&(0,o.jsx)(`span`,{className:a.topicCardBadge,children:`已完成`})]},e))}),_.length>0&&(0,o.jsxs)(`div`,{className:a.overallProgress,children:[(0,o.jsxs)(`div`,{className:a.progressLabel,children:[`总进度 `,_.length,`/`,C.length]}),(0,o.jsx)(`div`,{className:a.progressTrack,children:(0,o.jsx)(`div`,{className:a.progressFill,style:{width:`${_.length/C.length*100}%`}})})]})]}),e.phase===`explain`&&(0,o.jsxs)(`div`,{className:a.fadeIn,children:[(0,o.jsxs)(`h3`,{className:a.phaseTitle,children:[(0,o.jsxs)(`span`,{className:a.topicTag,children:[T[e.currentTopic],` `,w[e.currentTopic]]}),`概念讲解`]}),(0,o.jsx)(`div`,{className:a.explanationCard,children:F(h)}),(0,o.jsx)(`div`,{className:a.actions,children:(0,o.jsx)(`button`,{className:`${a.btnPrimary} ${a.btnPulse}`,onClick:O,children:`🎯 我理解了，开始练习`})})]}),e.phase===`attempt`&&p&&(0,o.jsxs)(`div`,{className:a.fadeIn,children:[(0,o.jsxs)(`div`,{className:a.quizHeader,children:[(0,o.jsxs)(`span`,{className:a.quizCounter,children:[`第 `,e.attempts,` 题`]}),(0,o.jsx)(`span`,{className:a.quizDifficulty,children:`⭐`.repeat(p.difficulty)})]}),(0,o.jsx)(`div`,{className:a.quizQuestion,children:p.question}),(0,o.jsx)(`div`,{className:a.optionsGrid,children:p.options.map((e,t)=>{let i=d&&t===p.correctIndex,s=d&&n===t&&t!==p.correctIndex,c=n===t&&!d;return(0,o.jsxs)(`button`,{className:`${a.optionCard} ${c?a.optionSelected:``} ${i?a.optionCorrect:``} ${s?a.optionWrong:``}`,onClick:()=>!d&&r(t),disabled:d,children:[(0,o.jsx)(`span`,{className:a.optionLetter,children:String.fromCharCode(65+t)}),(0,o.jsx)(`span`,{className:a.optionText,children:e}),i&&(0,o.jsx)(`span`,{className:a.optionMark,children:`✓`}),s&&(0,o.jsx)(`span`,{className:a.optionMark,children:`✗`})]},t)})}),!d&&n!==-1&&(0,o.jsx)(`div`,{className:a.actions,children:(0,o.jsx)(`button`,{className:a.btnPrimary,onClick:k,children:`提交答案`})})]}),e.phase===`feedback`&&p&&(0,o.jsxs)(`div`,{className:a.fadeIn,children:[(0,o.jsxs)(`div`,{className:`${a.feedbackCard} ${n===p.correctIndex?a.feedbackCorrectCard:a.feedbackWrongCard}`,children:[(0,o.jsx)(`div`,{className:a.feedbackIcon,children:n===p.correctIndex?`🎉`:`💡`}),(0,o.jsx)(`h4`,{className:a.feedbackTitle,children:n===p.correctIndex?`回答正确！`:`回答错误`}),(0,o.jsxs)(`div`,{className:a.feedbackAnswer,children:[`正确答案：`,(0,o.jsx)(`strong`,{children:p.options[p.correctIndex]})]}),(0,o.jsx)(`div`,{className:a.feedbackExplanation,children:F(p.explanation)})]}),(0,o.jsxs)(`div`,{className:a.masterySection,children:[(0,o.jsxs)(`div`,{className:a.masteryLabel,children:[(0,o.jsx)(`span`,{children:`主题掌握度`}),(0,o.jsxs)(`span`,{className:a.masteryValue,children:[e.mastery,`%`]})]}),(0,o.jsx)(`div`,{className:a.masteryTrack,children:(0,o.jsx)(`div`,{className:a.masteryFill,style:{width:`${e.mastery}%`}})}),e.mastery>=100&&(0,o.jsx)(`div`,{className:a.masteryComplete,children:`🌟 本主题已掌握！`})]}),(0,o.jsx)(`div`,{className:a.actions,children:e.mastery>=100?(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(`button`,{className:a.btnPrimary,onClick:j,children:`🏆 完成本主题`}),(0,o.jsx)(`button`,{className:a.btnGhost,onClick:A,children:`继续挑战 →`})]}):n===p.correctIndex?(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(`button`,{className:a.btnPrimary,onClick:A,children:`🎯 再做一题`}),(0,o.jsx)(`button`,{className:a.btnGhost,onClick:j,children:`完成本主题`})]}):(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(`button`,{className:a.btnPrimary,onClick:()=>t(e=>({...e,phase:`reinforce`})),children:`📖 查看错误分析`}),(0,o.jsx)(`button`,{className:a.btnGhost,onClick:A,children:`直接再做一题`})]})})]}),e.phase===`reinforce`&&(0,o.jsxs)(`div`,{className:a.fadeIn,children:[(0,o.jsx)(`h3`,{className:a.phaseTitle,children:`💪 错误分析与强化`}),(0,o.jsx)(`p`,{className:a.phaseSubtitle,children:`分析错误原因，加深理解`}),(0,o.jsx)(`div`,{className:a.errorList,children:e.errors.map((e,t)=>(0,o.jsxs)(`div`,{className:a.errorItem,children:[(0,o.jsxs)(`div`,{className:a.errorItemHeader,children:[(0,o.jsxs)(`span`,{className:a.errorItemType,children:[e.type===`understanding`&&`🧠 理解错误`,e.type===`calculation`&&`🔢 计算错误`,e.type===`method`&&`🔧 方法错误`]}),(0,o.jsxs)(`span`,{className:a.errorItemTime,children:[`第 `,t+1,` 次`]})]}),(0,o.jsx)(`p`,{className:a.errorItemDesc,children:e.description}),(0,o.jsxs)(`div`,{className:a.errorItemHint,children:[(0,o.jsx)(`strong`,{children:`💡 纠正：`}),e.hint]})]},t))}),(0,o.jsxs)(`div`,{className:a.actions,children:[(0,o.jsx)(`button`,{className:a.btnPrimary,onClick:M,children:`🔄 再做一题巩固`}),(0,o.jsx)(`button`,{className:a.btnGhost,onClick:j,children:`返回主题选择`})]})]})]})]},x)}var f={container:`_container_17l8y_1`,fadeIn:`_fadeIn_17l8y_1`,title:`_title_17l8y_18`,desc:`_desc_17l8y_28`,categoryGrid:`_categoryGrid_17l8y_35`,categoryBtn:`_categoryBtn_17l8y_42`,categoryBtnActive:`_categoryBtnActive_17l8y_78`,catIcon:`_catIcon_17l8y_84`,catLabel:`_catLabel_17l8y_89`,errorList:`_errorList_17l8y_95`,errorCard:`_errorCard_17l8y_101`,errorHeader:`_errorHeader_17l8y_113`,errorMeta:`_errorMeta_17l8y_131`,errorType:`_errorType_17l8y_138`,severity:`_severity_17l8y_147`,errorDesc:`_errorDesc_17l8y_156`,expandIcon:`_expandIcon_17l8y_162`,errorBody:`_errorBody_17l8y_168`,fadeSlideDown:`_fadeSlideDown_17l8y_1`,guidance:`_guidance_17l8y_188`,guidanceText:`_guidanceText_17l8y_195`,relatedConcept:`_relatedConcept_17l8y_205`,practice:`_practice_17l8y_214`},p={complexity:[{errorType:`calculation`,severity:`high`,description:`时间复杂度计算错误`,guidance:`复杂度分析的关键是找到基本操作执行次数与输入规模n的关系。常见错误：
1. 混淆最好/最坏/平均情况
2. 忽略嵌套循环的乘法关系
3. 忘记递归的额外开销`,relatedConcept:`时间复杂度分析`,practiceSuggestion:`练习分析以下代码的复杂度：单层循环、嵌套循环、二分查找、递归`},{errorType:`understanding`,severity:`medium`,description:`混淆O(1)、O(n)、O(logn)的含义`,guidance:`O(1)：与n无关，常数时间
O(n)：与n成正比，线性时间
O(logn)：每步问题规模减半
O(nlogn)：n次logn操作
O(n²)：双层循环`,relatedConcept:`渐进复杂度`,practiceSuggestion:`画出各复杂度随n增长的曲线，直观感受差异`}],"stack-queue":[{errorType:`understanding`,severity:`high`,description:`混淆栈(LIFO)和队列(FIFO)`,guidance:`栈=一摞盘子，最后放的先取(LIFO)
队列=排队买票，先来先服务(FIFO)

关键区别：出元素顺序不同
栈：最后入的最先出
队列：最先入的最先出`,relatedConcept:`栈与队列`,practiceSuggestion:`手动模拟：将1,2,3依次入栈再全部出栈 vs 依次入队再全部出队`},{errorType:`method`,severity:`high`,description:`BFS用栈、DFS用队列（搞反了）`,guidance:`BFS=广度优先=逐层扩展=队列(FIFO)
DFS=深度优先=深入到底=栈(LIFO)

记忆口诀：
B→广→层→队(Q)
D→深→底→栈(S)`,relatedConcept:`图遍历算法`,practiceSuggestion:`在图可视化页面分别用BFS和DFS遍历，观察访问顺序差异`}],pointer:[{errorType:`method`,severity:`high`,description:`链表插入时指针修改顺序错误`,guidance:`插入节点的正确顺序：
1. newNode.next = current.next（先连后）
2. current.next = newNode（再连前）

如果先执行步骤2，current原来的后继就丢失了！

口诀：先连后，再断前`,relatedConcept:`链表操作`,practiceSuggestion:`在链表可视化页面练习插入操作，观察指针变化`}],recursion:[{errorType:`understanding`,severity:`medium`,description:`不理解递归调用栈的展开过程`,guidance:`递归的本质：
1. 每次调用创建新的栈帧
2. 参数逐层传递直到基线条件
3. 返回值逐层回传组合结果

理解递归的关键：
• 相信递归函数能完成子问题
• 只关注当前层的逻辑
• 明确基线条件(何时停止)`,relatedConcept:`递归与调用栈`,practiceSuggestion:`手动展开递归调用树，跟踪每层的参数和返回值`}],bst:[{errorType:`understanding`,severity:`medium`,description:`不理解BST中序遍历=升序序列`,guidance:`BST性质：左子树<根<右子树
中序遍历：左→根→右

所以中序遍历BST时：
先访问所有比根小的(左子树)
再访问根
最后访问所有比根大的(右子树)
→ 自然得到升序序列！`,relatedConcept:`二叉搜索树`,practiceSuggestion:`在树可视化页面插入几个值，然后执行中序遍历观察结果`}],"sort-stability":[{errorType:`calculation`,severity:`medium`,description:`快排最坏情况复杂度误判`,guidance:`快排最坏情况O(n²)发生在：
• 每次选的基准值都是最大/最小值
• 例如：已排序数组+选首元素作基准

此时分区极度不平衡：
T(n) = T(n-1) + O(n) = O(n²)

优化：随机选基准或三数取中`,relatedConcept:`快速排序`,practiceSuggestion:`在排序可视化页面观察已排序数组用快排的过程`}]},m={calculation:{icon:`🔢`,label:`计算错误`,color:`#f59e0b`},understanding:{icon:`🧠`,label:`理解错误`,color:`#8b5cf6`},method:{icon:`🔧`,label:`方法错误`,color:`#ef4444`}},h={low:{label:`轻微`,color:`#10b981`},medium:{label:`中等`,color:`#f59e0b`},high:{label:`严重`,color:`#ef4444`}};function g(){let[e,t]=(0,i.useState)(null),[n,r]=(0,i.useState)(null),a=[{key:`complexity`,label:`复杂度分析`,icon:`📊`},{key:`stack-queue`,label:`栈与队列`,icon:`📚`},{key:`pointer`,label:`指针操作`,icon:`🔗`},{key:`recursion`,label:`递归理解`,icon:`🔄`},{key:`bst`,label:`二叉搜索树`,icon:`🌳`},{key:`sort-stability`,label:`排序算法`,icon:`📈`}],s=e&&p[e]||[];return(0,o.jsxs)(`div`,{className:f.container,children:[(0,o.jsx)(`h3`,{className:f.title,children:`🔍 错误诊断中心`}),(0,o.jsx)(`p`,{className:f.desc,children:`选择你遇到困难的领域，查看常见错误类型和针对性指导`}),(0,o.jsx)(`div`,{className:f.categoryGrid,children:a.map(n=>(0,o.jsxs)(`button`,{className:`${f.categoryBtn} ${e===n.key?f.categoryBtnActive:``}`,onClick:()=>{t(n.key),r(null)},children:[(0,o.jsx)(`span`,{className:f.catIcon,children:n.icon}),(0,o.jsx)(`span`,{className:f.catLabel,children:n.label})]},n.key))}),e&&s.length>0&&(0,o.jsx)(`div`,{className:f.errorList,children:s.map((e,t)=>(0,o.jsxs)(`div`,{className:f.errorCard,children:[(0,o.jsxs)(`button`,{className:f.errorHeader,onClick:()=>r(n===t?null:t),children:[(0,o.jsxs)(`div`,{className:f.errorMeta,children:[(0,o.jsxs)(`span`,{className:f.errorType,style:{color:m[e.errorType].color},children:[m[e.errorType].icon,` `,m[e.errorType].label]}),(0,o.jsx)(`span`,{className:f.severity,style:{color:h[e.severity].color},children:h[e.severity].label})]}),(0,o.jsx)(`h4`,{className:f.errorDesc,children:e.description}),(0,o.jsx)(`span`,{className:f.expandIcon,children:n===t?`▲`:`▼`})]}),n===t&&(0,o.jsxs)(`div`,{className:f.errorBody,children:[(0,o.jsxs)(`div`,{className:f.guidance,children:[(0,o.jsx)(`h5`,{children:`💡 纠正指导`}),(0,o.jsx)(`div`,{className:f.guidanceText,children:e.guidance.split(`
`).map((e,t)=>(0,o.jsx)(`div`,{children:e||(0,o.jsx)(`br`,{})},t))})]}),(0,o.jsxs)(`div`,{className:f.relatedConcept,children:[(0,o.jsx)(`h5`,{children:`📚 相关概念`}),(0,o.jsx)(`span`,{children:e.relatedConcept})]}),(0,o.jsxs)(`div`,{className:f.practice,children:[(0,o.jsx)(`h5`,{children:`🎯 练习建议`}),(0,o.jsx)(`span`,{children:e.practiceSuggestion})]})]})]},t))})]})}var _={page:`_page_1pa6o_1`,fadeIn:`_fadeIn_1pa6o_1`,header:`_header_1pa6o_13`,breadcrumb:`_breadcrumb_1pa6o_19`,sep:`_sep_1pa6o_38`,current:`_current_1pa6o_42`,title:`_title_1pa6o_47`,subtitle:`_subtitle_1pa6o_58`};function v(){return(0,o.jsxs)(`div`,{className:_.page,children:[(0,o.jsxs)(`div`,{className:_.header,children:[(0,o.jsxs)(`div`,{className:_.breadcrumb,children:[(0,o.jsx)(n,{to:`/`,children:`首页`}),(0,o.jsx)(`span`,{className:_.sep,children:`/`}),(0,o.jsx)(`span`,{className:_.current,children:`学习闭环`})]}),(0,o.jsx)(`h1`,{className:_.title,children:`学习闭环系统`}),(0,o.jsx)(`p`,{className:_.subtitle,children:`输入 → 讲解 → 尝试 → 反馈 → 强化，完整的个性化学习链路`})]}),(0,o.jsx)(d,{}),(0,o.jsx)(`div`,{style:{marginTop:`32px`},children:(0,o.jsx)(g,{})})]})}export{v as default};