import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const RightsideNav = () => {
	const [courses, setcourses] = useState([]);

	useEffect(() => {
		fetch("https://education-server-sigma.vercel.app/course")
			.then((res) => res.json())
			.then((data) => setcourses(data));
	}, []);

	return (
		<div>
			<h1 className="text-2xl text-blue-500">
				All Course{courses.length}
			</h1>
			{courses.map((course) => (
				<p
					className="m-2 text-2xl underline  decoration-blue-500"
					key={course.id}
				>
					<Link to={`/course/${course.id}`}>
						{course?.name}
					</Link>
				</p>
			))}
		</div>
	);
};

export default RightsideNav;
