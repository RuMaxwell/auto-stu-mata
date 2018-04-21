/*
 * DFA <=> regex logic.
 * 
 * IMPORTS
 * basic_utils.js
 */

/* ab
 * -> q0 -a> q1 -ε> q2 -b> q3*
 * 
 * a*
 *           v--ε---^
 * -> q0 -ε> q1 -a> q2 -ε> q3*
 *    v---------ε----------^
 * 
 * (a+b)
 * -> q0 -ε> q1 -a> q2 -ε> q3*
 *    v---ε> q4 -b> q5 -ε--^
 */