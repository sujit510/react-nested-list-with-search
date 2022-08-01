import { useCallback, useState } from "react";

export const OKRTree = ({ data }) => {
  const [expandMap, setExpandMap] = useState({});
  const toggleTreeNode = useCallback(
    (id) => {
      console.log("in toggleTreeNode::", expandMap);
      setExpandMap({
        ...expandMap,
        [id]: !expandMap[id]
      });
    },
    [expandMap]
  );
  console.log("expandMap::", expandMap);
  return (
    <>
      <p>OKR Tree</p>
      <ol>
        {Object.keys(data).map(
          (parentId) =>
            data[parentId].title && (
              <div key={parentId} class="parent-node">
                <span class="arrow-icon-parent">
                  <i
                    class={
                      `${data[parentId].children?.length && "arrow "}` +
                      `${expandMap[parentId] ? "down" : "right"}`
                    }
                    onClick={() => toggleTreeNode(parentId)}
                  ></i>
                </span>

                <li>
                  <span>{data[parentId].title}</span>
                  {data[parentId].children?.length && expandMap[parentId] && (
                    <ol>
                      {data[parentId].children.map((node) => (
                        <li key={node.id}>{node.title}</li>
                      ))}
                    </ol>
                  )}
                </li>
              </div>
            )
        )}
      </ol>
    </>
  );
};
