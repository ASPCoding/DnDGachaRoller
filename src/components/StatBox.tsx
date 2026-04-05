import "./StatBox.css"

export default function stat_box(name:string){
  return(
    <>
      <div id="box-wrapper">
        <h6 id="stat-title">{name}</h6>
        <div id="box">
          <h1>10</h1>
        </div>
      </div>
    </>
  )
}