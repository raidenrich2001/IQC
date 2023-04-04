import React from 'react';
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { useParams } from 'react-router-dom';

export default function Viewer() {
  const {filename} = useParams();
  const docs = [
    { uri: require(`./pdf/${filename.slice(0,-5)}.pdf`) } // Local File
  ];

  return (
<DocViewer documents={docs} pluginRenderers={DocViewerRenderers} />
  )
}
