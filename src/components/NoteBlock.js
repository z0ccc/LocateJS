import Block from './Block';

const NoteBlock = () => (
  <Block>
    <div className="contentBody">
      <b>Note:</b> Accuracy of the location prediction depends on how much
      authentic info your computer is exposing. LocateJS will not be able to
      detect your location 100% of the time. To learn more about this tool and
      how to hide your location visit the{' '}
      <a
        className="url"
        target="_blank"
        rel="noreferrer"
        alt="Link to Github page"
        href="https://github.com/z0ccc/LocateJS"
      >
        GitHub
      </a>
      .
    </div>
  </Block>
);

export default NoteBlock;
