/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package lambdacodealongps;

/**
 *
 * @author n0190184
 */
public class Main {
    public static void main(String[] args) {
        
        Predicate<String> p1 = s -> s.length() < 20;
        Predicate<String> p2 = s -> s.length() > 5;
        
        //can use the method defined on the predicate interface
        boolean b = p1.test("Hello");
        System.out.println("Hello is shorter than 20 chars : " + b);
        
        
        //and is a method that has to be declare din the interface
        Predicate<String> p3 = p1.and(p2);
        
        System.out.println("P3 for yes: " + p3.test("Yes"));
        System.out.println("P3 for Good Morning: " + p3.test("Good Morning"));
        System.out.println("P3 for Good Morning Gentlement: " + p3.test("Good Morning Gentlemen"));
        
        //lets also right an "or" method
        
        Predicate<String> p4 = p1.or(p2);
        System.out.println("P4 for yes: " + p4.test("Yes"));
        System.out.println("P4 for Good Morning: " + p4.test("Good Morning"));
        System.out.println("P4 for Good Morning Gentlement: " + p4.test("Good Morning Gentlemen"));
        
        Predicate<String> p5 = Predicate.isEqualTo("Yes");
        
        System.out.println("P5 for yes: " + p5.test("Yes"));
        System.out.println("P5 for no: " + p5.test("No"));
        
        Predicate<Integer> p6 = Predicate.isEqualTo(1);
        
        System.out.println("P5 for 1: " + p6.test(1));
        System.out.println("P5 for 2: " + p6.test(2));
        
    }
    
}
