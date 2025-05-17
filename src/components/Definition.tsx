const Definition = ({ def }: { def: any }) => {
  return (
    <div>
      <div className={`flex justify-between gap-x-1 `}>
        <span>
          <h2 className={`font-semibold`}>
            {def.article} {def.infinitive}
            <span className={`ml-2 font-normal italic`}>({def.type})</span>
            {def.plural && (
              <>
                {" . "}
                {def.plural}
                <span className={`ml-2 font-normal italic`}>(plural)</span>
              </>
            )}
          </h2>
          <p>{def.meaning} </p>
        </span>

        {def.conjugation && (
          <span>
            <h3 className={`font-medium`}>Perfekt</h3>
            <p>
              {def.conjugation?.perfect[0]} {""}
              {def.conjugation?.perfect[1]}
            </p>
          </span>
        )}
      </div>

      {def.conjugation && (
        <div className={`mt-3 grid grid-cols-2 gap-2`}>
          <div>
            <h3 className={`font-medium`}>Präsens</h3>
            ich {def.conjugation.present[0]} <br />
            du {def.conjugation.present[1]} <br />
            er {def.conjugation.present[2]} <br />
            ihr {def.conjugation.present[4]} <br />
            wir {def.conjugation.present[3]}
          </div>
          <div>
            <h3 className={`font-medium`}>Präteritum</h3>
            ich {def.conjugation.past[0]} <br />
            du {def.conjugation.past[1]} <br />
            er {def.conjugation.past[2]} <br />
            ihr {def.conjugation.past[4]} <br />
            wir {def.conjugation.past[3]}
          </div>
        </div>
      )}
    </div>
  );
};
export default Definition;
