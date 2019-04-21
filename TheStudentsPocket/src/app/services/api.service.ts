import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Student} from '../student.model';
import {Subject} from '../subject.model';
import {StudentGrade} from '../student_grade.model';
import {IsLoggedIn} from '../is-logged-in';
import {IsProcessed} from '../is-processed';
import {Logout} from '../logout';


/* @title APIService Class
 * @desc allows data to be passed to and from the backend where routes to databases are.
 */


@Injectable({
    providedIn: 'root'
})
export class ApiService {

    // Variables
    // Server URL:
    serverURL = 'http://ec2-54-72-80-41.eu-west-1.compute.amazonaws.com:8081';

    constructor(private http: HttpClient) {

    }

    // Function to check if the user has a logged in session:
    isLoggedIn(): Observable<IsLoggedIn> {
        console.log('IS LOGGED IN REQUEST SENT TO SERVER!');
        return this.http.get<IsLoggedIn>(this.serverURL + '/api/auth', {withCredentials: true});
    }// End isLoggedIn function

    /**
     * @title Adds a student.
     * @desc adds a student from the application.
     */
    registerStudent(student_id: String, student_first_name: String, student_last_name: String, student_pin: Number):
        Observable<IsProcessed> {
        // Setting values from form to a student object to be sent in the body of a url post request:
        const student: Student = {
            student_id: student_id,
            student_first_name: student_first_name,
            student_last_name: student_last_name,
            student_pin: student_pin
        };
        console.log('Inside API: ', student);
        // POST data to backend handle:
        return this.http.post<IsProcessed>(this.serverURL + '/api/students', student);
    }// End add student

    /**
     * @title Adds a subject to a students document in the database
     * @desc updates a students records in the database with a subject they added in the UI.
     * @param subject_name
     * @param subject_desc
     */
    addSubject(subject_name: String, subject_desc: String): Observable<IsProcessed> {
        const subject: Subject = {
            subject_name: subject_name,
            subject_desc: subject_desc
        };
        // Log message to server console:
        console.log('Inside API: ' + subject);

        // PUT REQUEST to server:
        return this.http.post<IsProcessed>(this.serverURL + '/api/students/subjects', subject);
    }// End addSubject function

    /**
     * @title Gets all modules.
     * @desc gets all the modules a student has entered into there account.
     */
    getAllSubjects(): Observable<any> {
        return this.http.get(this.serverURL + '/api/students/subjects/');
    }// End getAllSubjects function

    /**
     * @title Deletes a subject
     * @desc deletes a selected subject from the database.
     * @note passes String, Server takes care of the request.
     */
    deleteSubject(id: number): Observable<any> {
        return this.http.delete(this.serverURL + '/api/students/subjects/' + id);
    }// end delete subject function

    /**
     * @title GET a subject
     * @desc gets one subject from a students records by id of the subject
     * @param id.
     */
    getSubject(id: number): Observable<any> {
        return this.http.get(this.serverURL + '/api/students/subjects/subject/' + id);
    }// End get subject function

    /**
     * @title EDIT a subject
     * @desc updates a subjects records by the subject id.
     * @param id
     * @param subject_name
     * @param subject_desc
     */
    editSubject(id: number, subject_name: String, subject_desc: String): Observable<IsProcessed> {
        const subject: Subject = {
            subject_name: subject_name,
            subject_desc: subject_desc
        };
        return this.http.put<IsProcessed>(this.serverURL + '/api/students/subjects/subject/' + id, subject);
    }// End edit subject function

    /**
     * @title Gets a students details.
     * @desc gets a students details from the databases.
     */
    getStudentDetails(): Observable<any> {
        return this.http.get(this.serverURL + '/api/students/student');
    }

    /**
     * @title Gets all grade info.
     */
    getAllGradeInfo(): Observable<any> {
        return this.http.get(this.serverURL + '/api/students/subjects/grades');
    }

    /**
     * @title EDIT a grade
     * @desc updates a grade by the subject id.
     * @param id
     * @param subject_name
     * @param grade_type
     * @param grade_weight
     * @param curr_grade
     */
    editGrade(id: number, subject_name: String, grade_type: String, grade_weight: number, curr_grade: number): Observable<IsProcessed> {
        const studentGrade: StudentGrade = {
            subject_name: subject_name,
            grade_type: grade_type,
            grade_weight: grade_weight,
            curr_grade: curr_grade
        };
        return this.http.put<IsProcessed>(this.serverURL + '/api/students/subjects/grades/' + id, studentGrade);
    }// End edit subject function

    getGrade(id: number): Observable<any> {
        return this.http.get(this.serverURL + '/api/students/subjects/grade/' + id);
    }

    /**
     * @title Logout request
     * @desc a request to the server to log the user out and destroy their session.
     */
    logout(): Observable<Logout> {
        return this.http.get<Logout>(this.serverURL + '/api/logout', {withCredentials: true});
    }
}// End class
