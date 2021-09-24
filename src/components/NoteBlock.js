import Block from './Block';

const NoteBlock = () => (
  <Block>
    <div className="contentBody">
      <b>Note:</b> Accuracy of the location prediction is dependant on how well
      you have concealed your location data. The prediction can be anywhere from
      spot-on to inaccurate depending on how much identifiable and authentic
      info your exposing. To learn about how to hide your location visit the{' '}
      <a
        className="url"
        target="_blank"
        rel="noreferrer"
        alt="Link to Github repo"
        href="https://github.com/z0ccc/LocateJS#locatejs"
      >
        GitHub repo
      </a>
      .
    </div>
  </Block>
);

export default NoteBlock;
