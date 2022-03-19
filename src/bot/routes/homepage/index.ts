import path from 'path'

const home = async (req: any, res: { sendFile: (arg0: any) => void }) => {
  res.sendFile(path.join(`${__dirname}/../web/home.html`))
}

export default home
