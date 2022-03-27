import Block from './Block';

const NoteBlock = () => (
  <Block>
    <b>Note:</b> Accuracy of the location prediction is dependant on how much
    authentic info you&apos;re exposing. To learn about how to hide your location visit the{' '}
    <a
      className="link"
      target="_blank"
      rel="noreferrer"
      alt="Link to GitHub repo"
      href="https://github.com/z0ccc/LocateJS#locatejs"
    >
      GitHub repo
    </a>
    .
  </Block>
);

export default NoteBlock;
