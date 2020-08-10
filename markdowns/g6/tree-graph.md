# tree graph问题

1. 只能有一个根节点
2. Tree graph不能存在循环依赖的节点，一个节点只能有一个parent，在初始化时会在tree中根据id查找对应的节点，如果己经存在了就报错，不存在就创建，同一个节点出现两次就直接初始化失败



```
const tree = {
      id: "root",
      name: "root",
      children: [
        { id: "a", name: "a", children: [{ id: "a1", name: "a1" }] },
        { id: "b", name: "b", children: [{ id: "a1" }] },
      ],
    };
    
layout: {
	type: "compactBox",
	direction: "LR",
},

type: "force",
preventOverlap: true,
nodeSpacing: 20,

layout: {
        type: "dagre",
        rankdir: "LR",
        align: "DL",
        nodesepFunc: () => 1,
        ranksepFunc: () => 1,
      },


const data = {
      nodes: [
        { id: "root", label: "root" },
        { id: "c1", label: "c1" },
        { id: "c11", label: "c11" },
        { id: "c12", label: "c12" },
        { id: "c2", label: "c2" },
        { id: "c21", label: "c21" },
        { id: "c22", label: "c22" },
      ],
      edges: [
        { source: "root", target: "c1" },
        { source: "root", target: "c2" },
        { source: "c1", target: "c11" },
        { source: "c1", target: "c12" },
        { source: "c2", target: "c21" },
        { source: "c2", target: "c22" },
        { source: "c22", target: "c12" },
      ],
    };
```

