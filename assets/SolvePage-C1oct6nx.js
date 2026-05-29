import{a as e,i as t,n,t as r}from"./index-Cv-MoqlF.js";var i=e(t(),1),a={container:`_container_vg5pz_1`,fadeIn:`_fadeIn_vg5pz_1`,problemList:`_problemList_vg5pz_18`,problemGrid:`_problemGrid_vg5pz_31`,problemCard:`_problemCard_vg5pz_38`,solverView:`_solverView_vg5pz_86`,solverHeader:`_solverHeader_vg5pz_88`,backBtn:`_backBtn_vg5pz_92`,problemDesc:`_problemDesc_vg5pz_117`,flowChart:`_flowChart_vg5pz_123`,flowNode:`_flowNode_vg5pz_135`,flowLine:`_flowLine_vg5pz_141`,flowLineActive:`_flowLineActive_vg5pz_150`,stepNode:`_stepNode_vg5pz_154`,stepVisited:`_stepVisited_vg5pz_174`,stepActive:`_stepActive_vg5pz_179`,pulseNode:`_pulseNode_vg5pz_1`,stepIcon:`_stepIcon_vg5pz_191`,stepTitle:`_stepTitle_vg5pz_196`,stepDetail:`_stepDetail_vg5pz_202`,fadeSlideUp:`_fadeSlideUp_vg5pz_1`,stepDetailHeader:`_stepDetailHeader_vg5pz_217`,stepDetailIcon:`_stepDetailIcon_vg5pz_224`,stepDesc:`_stepDesc_vg5pz_234`,stepContent:`_stepContent_vg5pz_240`,nextSteps:`_nextSteps_vg5pz_252`,nextLabel:`_nextLabel_vg5pz_260`,nextBtn:`_nextBtn_vg5pz_265`},o=r(),s={"reverse-linked-list":{title:`反转链表`,description:`给定单链表的头节点head，反转链表并返回反转后的链表`,steps:[{id:`s1`,title:`理解问题`,description:`明确输入输出`,detail:`输入：链表头节点
输出：反转后的链表头节点
例：1→2→3→NULL 变为 3→2→1→NULL`,type:`input`,next:[`s2`]},{id:`s2`,title:`分析思路`,description:`如何反转？`,detail:`核心思路：逐个节点反转指针方向
需要三个指针：prev, curr, next
prev初始化为NULL（反转后末尾指向NULL）`,type:`think`,next:[`s3`,`s4`]},{id:`s3`,title:`方法一：迭代`,description:`三指针迭代法`,detail:`1. prev = NULL, curr = head
2. 循环：
   next = curr.next  // 保存后继
   curr.next = prev  // 反转指针
   prev = curr       // 前驱前进
   curr = next       // 当前前进
3. 返回prev（新的头节点）

时间O(n) 空间O(1)`,type:`choose`,next:[`s5`]},{id:`s4`,title:`方法二：递归`,description:`递归反转法`,detail:`1. 基线：head==NULL || head.next==NULL → return head
2. 递归：newHead = reverse(head.next)
3. head.next.next = head  // 后继指向自己
4. head.next = NULL       // 断开原指针
5. return newHead

时间O(n) 空间O(n)递归栈`,type:`choose`,next:[`s5`]},{id:`s5`,title:`验证结果`,description:`用示例验证`,detail:`原链表：1→2→3→NULL

迭代过程：
Step1: prev=NULL, curr=1, next=2 → 1→NULL
Step2: prev=1, curr=2, next=3 → 2→1→NULL
Step3: prev=2, curr=3, next=NULL → 3→2→1→NULL

✓ 结果正确！`,type:`verify`,next:[]}]},"binary-search":{title:`二分查找`,description:`在有序数组中查找目标值，返回其索引，不存在则返回-1`,steps:[{id:`s1`,title:`理解问题`,description:`明确前提条件`,detail:`前提：数组必须有序！
输入：有序数组nums[]，目标值target
输出：target的索引，不存在返回-1`,type:`input`,next:[`s2`]},{id:`s2`,title:`分析思路`,description:`分治思想`,detail:`每次将搜索范围缩小一半：
• 比较中间元素与target
• 如果相等，找到了
• 如果中间值<target，搜索右半部分
• 如果中间值>target，搜索左半部分`,type:`think`,next:[`s3`]},{id:`s3`,title:`编写算法`,description:`循环实现`,detail:`left = 0, right = n-1
while (left <= right):
    mid = left + (right-left)/2  // 防溢出
    if nums[mid] == target: return mid
    if nums[mid] < target: left = mid+1
    if nums[mid] > target: right = mid-1
return -1

时间O(logn) 空间O(1)`,type:`execute`,next:[`s4`]},{id:`s4`,title:`常见错误`,description:`边界条件`,detail:`⚠ 循环条件：left <= right（不是<）
⚠ mid计算：left+(right-left)/2（防溢出）
⚠ 更新边界：left=mid+1, right=mid-1（不是=mid）

这些是计算错误的高发区！`,type:`verify`,next:[]}]},"valid-parentheses":{title:`有效的括号`,description:`给定只含括号的字符串，判断括号是否有效配对`,steps:[{id:`s1`,title:`理解问题`,description:`明确有效配对规则`,detail:`有效：() [] {}
有效：{[()]}
无效：(]  -- 类型不匹配
无效：([)]  -- 交叉嵌套
无效：(  -- 未闭合`,type:`input`,next:[`s2`]},{id:`s2`,title:`选择数据结构`,description:`栈！`,detail:`为什么用栈？
• 左括号需要与最近的右括号匹配 → LIFO
• 嵌套结构天然适合栈

规则：
• 遇到左括号 → 压栈
• 遇到右括号 → 弹栈，检查是否匹配`,type:`choose`,next:[`s3`]},{id:`s3`,title:`编写算法`,description:`栈实现`,detail:`stack = []
for char in s:
    if char是左括号: stack.push(char)
    else:
        if stack为空: return false  // 多余右括号
        top = stack.pop()
        if top和char不匹配: return false

return stack为空  // 检查是否所有左括号都匹配了

时间O(n) 空间O(n)`,type:`execute`,next:[`s4`]},{id:`s4`,title:`验证`,description:`测试用例`,detail:`✓ "()" → push(, pop匹配 → 栈空 → true
✓ "()[]{}" → 依次匹配 → true
✓ "{[()]}" → 嵌套匹配 → true
✗ "(]" → pop(不匹配] → false
✗ "([)]" → pop[不匹配) → false
✗ "(" → 栈非空 → false`,type:`verify`,next:[]}]}},c={input:`📝`,think:`🧠`,choose:`🔀`,execute:`⚡`,verify:`✅`},l={input:`#3b82f6`,think:`#8b5cf6`,choose:`#f59e0b`,execute:`#10b981`,verify:`#06b6d4`};function u(){let[e,t]=(0,i.useState)(null),[n,r]=(0,i.useState)(``),[u,d]=(0,i.useState)(new Set),f=e?s[e]:null,p=f?.steps.find(e=>e.id===n),m=e=>{t(e);let n=s[e].steps[0];r(n.id),d(new Set([n.id]))},h=e=>{r(e),d(t=>new Set([...t,e]))};return(0,o.jsx)(`div`,{className:a.container,children:e?f?(0,o.jsxs)(`div`,{className:a.solverView,children:[(0,o.jsxs)(`div`,{className:a.solverHeader,children:[(0,o.jsx)(`button`,{className:a.backBtn,onClick:()=>{t(null),r(``)},children:`← 返回`}),(0,o.jsx)(`h3`,{children:f.title}),(0,o.jsx)(`p`,{className:a.problemDesc,children:f.description})]}),(0,o.jsx)(`div`,{className:a.flowChart,children:f.steps.map((e,t)=>(0,o.jsxs)(`div`,{className:a.flowNode,children:[t>0&&(0,o.jsx)(`div`,{className:`${a.flowLine} ${u.has(e.id)?a.flowLineActive:``}`}),(0,o.jsxs)(`button`,{className:`${a.stepNode} ${u.has(e.id)?a.stepVisited:``} ${n===e.id?a.stepActive:``}`,style:{"--step-color":l[e.type]},onClick:()=>r(e.id),children:[(0,o.jsx)(`span`,{className:a.stepIcon,children:c[e.type]}),(0,o.jsx)(`span`,{className:a.stepTitle,children:e.title})]})]},e.id))}),p&&(0,o.jsxs)(`div`,{className:a.stepDetail,style:{borderLeftColor:l[p.type]},children:[(0,o.jsxs)(`div`,{className:a.stepDetailHeader,children:[(0,o.jsx)(`span`,{className:a.stepDetailIcon,children:c[p.type]}),(0,o.jsxs)(`div`,{children:[(0,o.jsx)(`h4`,{children:p.title}),(0,o.jsx)(`p`,{className:a.stepDesc,children:p.description})]})]}),(0,o.jsx)(`div`,{className:a.stepContent,children:p.detail}),p.next.length>0&&(0,o.jsxs)(`div`,{className:a.nextSteps,children:[(0,o.jsx)(`span`,{className:a.nextLabel,children:`下一步：`}),p.next.map(e=>{let t=f.steps.find(t=>t.id===e);return t?(0,o.jsxs)(`button`,{className:a.nextBtn,onClick:()=>h(e),children:[c[t.type],` `,t.title]},e):null})]})]})]}):null:(0,o.jsxs)(`div`,{className:a.problemList,children:[(0,o.jsx)(`h3`,{children:`选择一道题目`}),(0,o.jsx)(`div`,{className:a.problemGrid,children:Object.entries(s).map(([e,t])=>(0,o.jsxs)(`button`,{className:a.problemCard,onClick:()=>m(e),children:[(0,o.jsx)(`h4`,{children:t.title}),(0,o.jsx)(`p`,{children:t.description})]},e))})]})})}var d={page:`_page_1pa6o_1`,fadeIn:`_fadeIn_1pa6o_1`,header:`_header_1pa6o_13`,breadcrumb:`_breadcrumb_1pa6o_19`,sep:`_sep_1pa6o_38`,current:`_current_1pa6o_42`,title:`_title_1pa6o_47`,subtitle:`_subtitle_1pa6o_58`};function f(){return(0,o.jsxs)(`div`,{className:d.page,children:[(0,o.jsxs)(`div`,{className:d.header,children:[(0,o.jsxs)(`div`,{className:d.breadcrumb,children:[(0,o.jsx)(n,{to:`/`,children:`首页`}),(0,o.jsx)(`span`,{className:d.sep,children:`/`}),(0,o.jsx)(`span`,{className:d.current,children:`问题求解`})]}),(0,o.jsx)(`h1`,{className:d.title,children:`问题求解步骤可视化`}),(0,o.jsx)(`p`,{className:d.subtitle,children:`以流程图形式展示解题思路和步骤，培养系统化的问题求解能力`})]}),(0,o.jsx)(u,{})]})}export{f as default};