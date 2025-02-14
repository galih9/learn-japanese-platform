type IProps = {
  setModal: React.Dispatch<React.SetStateAction<boolean>>
  totalHelp: number
}

export const KanaIndicator: React.FC<IProps> = ({ totalHelp}) => {
  return (
    <>
      <div className="flex justify-between">
        {/* <p
          className=" cursor-pointer"
          onClick={() => {
            setModal(true)
          }}
        >
          {"Check All Cards"}
        </p> */}

        <p>{`Hisho : ${totalHelp}`}</p>
      </div>
    </>
  )
}
