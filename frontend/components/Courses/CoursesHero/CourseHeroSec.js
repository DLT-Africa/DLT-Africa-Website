import Link from "next/link";
const CourseSection = (props) => {
  return (
    <>
      <section>
        <div>
          <div>
            <h4>{props.title}</h4>
            <p>{props.text}</p>

            <div>
              {/* <Link>Apply Now</Link> */}

              <button>{props.button2}</button>
            </div>
            <p>{props.headline}</p>
          </div>

          <div>{/* <img src={props.img} alt={props.title} /> */}</div>
        </div>
      </section>
    </>
  );
};

export default CourseSection;
