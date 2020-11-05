# tree graph问题

1. 只能有一个根节点
2. Tree graph不能存在循环依赖的节点，一个节点只能有一个parent，在初始化时会在tree中根据id查找对应的节点，如果己经存在了就报错，不存在就创建，同一个节点出现两次就直接初始化失败



```javascript
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


const data1 = {
      nodes: [
        { id: "root", name: "root" },
        { id: "c1", name: "c1" },
        { id: "c11", name: "c11" },
        { id: "c12", name: "c12" },
        { id: "c2", name: "c2" },
        { id: "c21", name: "c21" },
        { id: "c22", name: "c22" },
      ],
      edges: [
        { id: "1", source: "root", target: "c1" },
        { id: "2", source: "root", target: "c2" },
        { id: "3", source: "c1", target: "c11" },
        { id: "4", source: "c1", target: "c12" },
        { id: "5", source: "c2", target: "c21" },
        { id: "6", source: "c2", target: "c22" },
        { id: "7", source: "c22", target: "c12" },
      ],
    };

    elk
      .layout({
        id: "root",
        layoutOptions: { "elk.algorithm": "layered" },
        children: data1.nodes,
        edges: data1.edges,
      })
      .then(() => {
        graph.data(data1);
        graph.render();
        graph.fitView();
      });
```



``` typescript
import React, { useRef, useEffect } from "react";
import G6, { Graph as G6Graph, Util } from "@antv/g6/es";
import { IG6GraphEvent, NodeConfig, EdgeConfig } from "@antv/g6/es/types";
import { positionNodes } from "./tree-layout";
import "./custom-node";
import { ELKLayout } from "./elk-layout";

type TreeGraphProps = {
  data: any;
};
export default function TreeGraph({ data }: TreeGraphProps) {
  const containerRef = useRef(null);
  const g6Ref = useRef<G6Graph>();
  useEffect(() => {
    const containerEl = containerRef.current! as HTMLDivElement;
    const box = containerEl!.getBoundingClientRect();
    const graph = new G6.Graph({
      container: containerEl,
      width: box.width,
      height: box.height,
      modes: {
        default: ["drag-canvas", "zoom-canvas", "drag-node"],
      },
      layout: {
        type: "elk-layout",
      },
      defaultNode: {
        size: 26,
        anchorPoints: [[0.5, 0.5]],
        labelCfg: {
          position: "top",
        },
        style: {
          fill: "#C6E5FF",
          stroke: "#5B8FF9",
        },
      },
      defaultEdge: {
        type: "line",
        style: {
          stroke: "#A3B1BF",
          endArrow: {
            path: G6.Arrow.vee(10, 12, 5),
          },
        },
      },
    });
    graph.on("node:click", (event: IG6GraphEvent) => {
      const { item } = event;
      const model = item!.getModel();
      window.a = item;
    });
    g6Ref.current = graph;
  }, []);
  useEffect(() => {
    const graph = g6Ref.current!;
    const containerEl = containerRef.current! as HTMLDivElement;
    const box = containerEl!.getBoundingClientRect();
    if (box.width !== graph.getWidth()) {
      graph.changeSize(box.width, box.height);
    }
    graph.node((node: NodeConfig) => {
      const [width] = Util.getTextSize(node.name, 15);
      return {
        id: node.id,
        label: node.name,
        size: [20, 30],
      } as Partial<NodeConfig>;
    });

    new ELKLayout({}).layout(data.nodes, data.edges).then(() => {
      graph.data(data);
      graph.render();
      graph.fitView();
    });
  }, [data]);

  return (
    <div
      ref={containerRef}
      className="tree-graph"
      id="tree-graph"
      style={{ width: "100%", height: 600 }}
    ></div>
  );
}

```

